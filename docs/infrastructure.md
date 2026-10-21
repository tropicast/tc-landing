# Infrastructure

`infra/terraform` creates the landing page's hosting (#4):

- **Vercel project** `tc-landing`, built from `tropicast/tc-landing` (Next.js, Node 24): `main` deploys to
  production, every other branch and pull request gets a preview URL (Vercel comments it on the PR).
- **Domains**: `www.tropicastradio.com` is the primary address; `tropicastradio.com` answers 308 to it.
- **Cloudflare DNS** (zone `tropicastradio.com`, DNS only, not proxied, so Vercel issues the certificates):
  `www` CNAME `cname.vercel-dns.com`, and the apex A `76.76.21.21`. No AAAA: Vercel serves no IPv6 on a domain
  behind external DNS. `app`, `listen` and `ingest` belong to tc-dashboard and tc-streaming and are not touched.

State: the shared bucket (`tropicast-tfstate`), key `tc-landing/landing.tfstate`.

## One-time setup (operator)

1. **Vercel**: a team for Tropicast, and Vercel's GitHub app installed on the `tropicast` organization with access
   to `tc-landing` (Vercel → Settings → Git). Without it the project cannot link to the repository.
2. **Tokens**, stored as repository secrets of `tc-landing`:
    - `VERCEL_API_TOKEN`: Vercel → Account → Tokens, scoped to the team.
    - `CLOUDFLARE_API_TOKEN`: "Zone DNS: Edit" on `tropicastradio.com` only (the one tc-dashboard uses works).
    - `TF_STATE_ACCESS_KEY`, `TF_STATE_SECRET_KEY`: the state bucket's keys, as in tc-dashboard.
3. **Repository variables**:
    - `TF_STATE_BUCKET` = `tropicast-tfstate`, `TF_STATE_LOCATION` = `fsn1`;
    - `TFVARS`, for example:
        ```hcl
        vercel_team        = "<team slug>"                     # leave out for a personal account
        cloudflare_zone_id = "<32 hex: Cloudflare → Overview → API → Zone ID>"
        demo_station       = "<tenant-slug>/<station-slug>"   # optional: the live demo (#5)
        site_stage         = "beta"                          # default; "live" at launch (#23)
        ```

## Plan and apply

Actions → **Terraform deploy** (from `main`):

1. `action = plan`; read the plan in the run summary. The first one creates the project, two domains and two DNS
   records, and changes nothing else.
2. `action = apply`, `plan_run_id = <that run's ID>`: applies exactly that plan.

Locally, for plan, output and import only (apply goes through the workflow, which is the state's lock):

```sh
cd infra/terraform
cp backend.hcl.example backend.hcl && cp terraform.tfvars.example terraform.tfvars   # edit
export VERCEL_API_TOKEN=... CLOUDFLARE_API_TOKEN=... AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=...
terraform init -backend-config=backend.hcl
terraform plan
```

## GitLab (#31)

`.gitlab-ci.yml` runs the same checks as `.github/workflows` on the self-hosted GitLab (tropicast/tc-devops#1), plus
the shared security jobs (`ci/security.yml` in tc-devops). Both run until the move to GitLab
(tropicast/tc-devops#7).

| GitHub                                   | GitLab job                                                         |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `ci.yml` → Lint, test and build          | `web`                                                              |
| `terraform.yml` → validate               | `terraform:validate` (when `infra/terraform` changes)              |
| `terraform-deploy.yml`, plan / apply     | `terraform:plan`, then `terraform:apply` (manual, `main`)          |
| Vercel's GitHub integration (production) | `deploy` (manual, `main`)                                          |
| —                                        | `secret-detection`, `sast`, `dependency-scan`, `iac-scan`, `sonar` |

Pull request previews have no GitLab equivalent: a preview build would need the Vercel token in merge request
pipelines, which protected variables keep out.

### Setup

1. **Protected branch** `main`, and the **environment** `production` (Settings → CI/CD and Operate → Environments).
   Optionally, require an approval to deploy to it.
2. **CI/CD variables** (Settings → CI/CD → Variables), all **Protected**, the secrets also **Masked**:
    - `VERCEL_API_TOKEN`, `CLOUDFLARE_API_TOKEN`, `TF_STATE_ACCESS_KEY`, `TF_STATE_SECRET_KEY`: as on GitHub;
    - `TF_STATE_BUCKET` = `tropicast-tfstate`, `TF_STATE_LOCATION` = `fsn1`, `TFVARS`: as on GitHub;
    - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: the team's and the project's IDs (Vercel → the project → Settings →
      General, or `.vercel/project.json` after `vercel link`).

### Plan, apply and deploy

In the pipeline of a commit on `main`:

- **Terraform**: start `terraform:plan` and read the plan in its log. Start `terraform:apply` to apply exactly that
  plan. The `terraform-production` resource group runs one Terraform job at a time, which is the state's lock.
- **Deploy**: start `deploy` once `web` has passed. It runs `vercel pull`, `vercel build --prod` and
  `vercel deploy --prebuilt --prod`; Vercel's environment variables (`SITE_STAGE`, `DEMO_STATION`) apply as before.

### Move to GitLab

When the repository moves (tropicast/tc-devops#7):

1. Add `github_repository = null` to `TFVARS`, then plan and apply. Vercel stops building from GitHub, and the
   private repository needs no paid Vercel plan.
2. From then on, production changes only through the `deploy` job.
3. Remove `.github/workflows` and `.github/dependabot.yml`.

## Check

```sh
dig +short www.tropicastradio.com           # cname.vercel-dns.com. and Vercel's addresses
curl -sI https://www.tropicastradio.com     # 200, certificate valid
curl -sI https://tropicastradio.com         # 308, location: https://www.tropicastradio.com/
dig +short app.tropicastradio.com listen.tropicastradio.com   # unchanged
```

Vercel's domain card shows whether the records are right. If it asks for other values (a project-specific CNAME or
another IP), set `vercel_cname_target` / `vercel_apex_ipv4` in `TFVARS` and apply again.

## Launch (end of the beta)

Set `site_stage = "live"` in `TFVARS` and run **Terraform deploy** (plan, then apply). It changes
`SITE_STAGE` in Vercel; the next deployment (redeploy the latest from Vercel, or merge anything) builds the pages
without the beta banner and badge.

## Roll back a release

Vercel → the project → Deployments → a previous production deployment → **Instant Rollback**. Nothing to rebuild;
the next deploy replaces it. Or revert the commit on `main` and deploy again.

## Remove

`terraform destroy` (locally, with the backend) deletes the project, its domains and the two DNS records. Nothing
else uses them.
