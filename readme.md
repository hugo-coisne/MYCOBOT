# Mycobot

Pour démarrer l'application (le modèle d'IA est déjà entraîné) :
`docker compose up -d`

Pour démarrer les services de télémétrie (inutile si l'application Mycobot n'est pas en service):
`docker compose --profile monitoring up -d`

Pour démarrer les tests de charge (l'application Mycobot doit être en service avant de procéder):
`docker compose --profile load-testing up -d`