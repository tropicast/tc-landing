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
        vercel_team        = "<team slug>"
        cloudflare_zone_id = "<zone ID of tropicastradio.com>"
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

## Check

```sh
dig +short www.tropicastradio.com           # cname.vercel-dns.com. and Vercel's addresses
curl -sI https://www.tropicastradio.com     # 200, certificate valid
curl -sI https://tropicastradio.com         # 308, location: https://www.tropicastradio.com/
dig +short app.tropicastradio.com listen.tropicastradio.com   # unchanged
```

Vercel's domain card shows whether the records are right. If it asks for other values (a project-specific CNAME or
another IP), set `vercel_cname_target` / `vercel_apex_ipv4` in `TFVARS` and apply again.

## Roll back a release

Vercel → the project → Deployments → a previous production deployment → **Instant Rollback**. Nothing to rebuild;
the next push to `main` deploys again. Or revert the commit on `main`.

## Remove

`terraform destroy` (locally, with the backend) deletes the project, its domains and the two DNS records. Nothing
else uses them.
