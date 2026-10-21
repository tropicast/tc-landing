variable "vercel_team" {
  description = "Vercel team slug or ID that owns the project. Null: the token's own account (a personal Hobby account cannot be read as a team)."
  type        = string
  default     = null
}

variable "project_name" {
  description = "Vercel project name."
  type        = string
  default     = "tc-landing"
}

variable "github_repository" {
  description = "GitHub repository Vercel builds from (owner/name); Vercel's GitHub app must have access to it. Null: no Git link, GitLab CI deploys with the Vercel CLI."
  type        = string
  default     = "tropicast/tc-landing"
}

variable "production_branch" {
  description = "Branch whose pushes deploy to production; every other branch and PR gets a preview."
  type        = string
  default     = "main"
}

variable "domain" {
  description = "Apex domain: it redirects to www."
  type        = string
  default     = "tropicastradio.com"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID of the domain (32 hex characters, not the domain name). Null skips the DNS records."
  type        = string
  default     = null

  validation {
    condition     = var.cloudflare_zone_id == null || can(regex("^[0-9a-f]{32}$", var.cloudflare_zone_id))
    error_message = "cloudflare_zone_id is the zone's ID (32 hex characters, Cloudflare → the domain → Overview → API), not its name."
  }
}

# Vercel's documented targets for a domain on external DNS. Its domain card may show a
# project-specific CNAME or another IP: if it does, set these to what it shows.
variable "vercel_cname_target" {
  description = "CNAME target for www."
  type        = string
  default     = "cname.vercel-dns.com"
}

variable "vercel_apex_ipv4" {
  description = "A record for the apex. Vercel serves no IPv6 on domains behind external DNS: no AAAA."
  type        = string
  default     = "76.76.21.21"
}

variable "demo_station" {
  description = "Station the site's live demo plays, as tenant-slug/station-slug (its plan must include the website player). Null: no demo, the section offers the sign-up."
  type        = string
  default     = null
}

variable "site_stage" {
  description = "beta: the site shows a beta banner and badge (#23). At launch, set live and apply; the next build drops them."
  type        = string
  default     = "beta"

  validation {
    condition     = contains(["beta", "live"], var.site_stage)
    error_message = "site_stage is beta or live."
  }
}
