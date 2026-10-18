variable "vercel_team" {
  description = "Vercel team slug or ID that owns the project."
  type        = string
}

variable "project_name" {
  description = "Vercel project name."
  type        = string
  default     = "tc-landing"
}

variable "github_repository" {
  description = "GitHub repository Vercel builds from (owner/name). Vercel's GitHub app must have access to it."
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
  description = "Cloudflare zone ID of the domain. Null skips the DNS records."
  type        = string
  default     = null
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
