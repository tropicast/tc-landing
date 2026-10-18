terraform {
  required_version = ">= 1.10"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 5.21"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  # Remote state settings come from backend.hcl; see backend.hcl.example.
  # Same bucket as tc-streaming and tc-dashboard, another key.
  backend "s3" {}
}

# Reads VERCEL_API_TOKEN. team: the Vercel team that owns the project.
provider "vercel" {
  team = var.vercel_team
}

# Reads CLOUDFLARE_API_TOKEN: a token limited to "Zone DNS: Edit" on the zone.
provider "cloudflare" {}
