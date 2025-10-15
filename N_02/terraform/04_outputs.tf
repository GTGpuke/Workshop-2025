output "dns_records_created" {
  description = "Liste des enregistrements DNS créés pour DOCKERWARTS."
  value = {
    for key, record in cloudflare_record.dockerwarts_dns :
    key => "https://${record.hostname}"
  }
}
