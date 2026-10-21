locals {
  www = "www.${var.domain}"
}

# Linked to GitHub, Vercel builds and deploys it: production from the production
# branch, a preview for every other branch and pull request. Unlinked
# (github_repository = null, after the move to GitLab, tropicast/tc-devops#7),
# GitLab CI deploys it with the Vercel CLI (.gitlab-ci.yml), and a private
# repository needs no paid Vercel plan.
resource "vercel_project" "landing" {
  name      = var.project_name
  framework = "nextjs"

  git_repository = var.github_repository == null ? null : {
    type              = "github"
    repo              = var.github_repository
    production_branch = var.production_branch
  }

  # The same Node as .nvmrc and CI.
  node_version = "24.x"
}

# www is the primary address (Vercel's recommendation); the apex sends visitors there.
resource "vercel_project_domain" "www" {
  project_id = vercel_project.landing.id
  domain     = local.www
}

resource "vercel_project_domain" "apex" {
  project_id           = vercel_project.landing.id
  domain               = var.domain
  redirect             = vercel_project_domain.www.domain
  redirect_status_code = 308
}

# DNS only (not proxied): Vercel issues and renews the certificates itself, which needs
# the records to point at it directly. app, listen and ingest are in other repositories
# and are not touched here.
resource "cloudflare_dns_record" "www" {
  count   = var.cloudflare_zone_id == null ? 0 : 1
  zone_id = var.cloudflare_zone_id
  name    = local.www
  type    = "CNAME"
  content = var.vercel_cname_target
  ttl     = 300
  proxied = false
  comment = "tc-landing on Vercel (Terraform)"
}

resource "cloudflare_dns_record" "apex" {
  count   = var.cloudflare_zone_id == null ? 0 : 1
  zone_id = var.cloudflare_zone_id
  name    = var.domain
  type    = "A"
  content = var.vercel_apex_ipv4
  ttl     = 300
  proxied = false
  comment = "tc-landing on Vercel, redirects to www (Terraform)"
}

# Read at build time by the demo section (src/site/links.ts). Public: it names a public page.
resource "vercel_project_environment_variable" "demo_station" {
  count      = var.demo_station == null ? 0 : 1
  project_id = vercel_project.landing.id
  key        = "DEMO_STATION"
  value      = var.demo_station
  target     = ["production", "preview"]
  sensitive  = false
}

# Read at build time (src/site/stage.ts): changing it takes effect with the next deployment.
resource "vercel_project_environment_variable" "site_stage" {
  project_id = vercel_project.landing.id
  key        = "SITE_STAGE"
  value      = var.site_stage
  target     = ["production", "preview"]
  sensitive  = false
}
