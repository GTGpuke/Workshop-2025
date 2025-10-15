variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
  description = "Token API Cloudflare avec les droits Zone:Read et DNS:Edit."
}

variable "zone_id" {
  type        = string
  description = "ID de la zone Cloudflare pour votre domaine principal."
}

variable "vps_ipv4" {
  type        = string
  description = "Adresse IP publique de votre serveur VPS."
}

variable "subdomains" {
  type        = list(string)
  default     = ["glpi", "grafana", "es", "cassandra"]
  description = "Liste des sous-domaines à créer pour la stack DOCKERWARTS."
}

variable "proxied" {
  type        = bool
  default     = false
  description = "Mettre à 'true' pour activer le proxy Cloudflare (nuage orange)."
}
