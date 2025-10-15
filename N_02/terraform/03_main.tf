# Par sécurité, on s'assure de ne jamais toucher au sous-domaine 'portainer'.
locals {
  safe_subdomains = [for s in var.subdomains : lower(s) if lower(s) != "portainer"]
}

resource "cloudflare_record" "dockerwarts_dns" {
  for_each = toset(local.safe_subdomains)

  zone_id = var.zone_id
  name    = each.value      # ex: "glpi"
  content   = var.vps_ipv4    # L'IP de votre serveur
  type    = "A"
  proxied = var.proxied
  ttl     = 1               # TTL court pour des changements rapides
}
