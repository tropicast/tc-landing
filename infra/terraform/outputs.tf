output "project_id" {
  value = vercel_project.landing.id
}

output "urls" {
  value = ["https://${local.www}", "https://${var.domain} (308 to www)"]
}
