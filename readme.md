# Mycobot

Pour démarrer l'application (le modèle d'IA est déjà entraîné) :
`docker compose up -d`

Une fois l'application en service : l'interface utilisateur est accessible sur le port `4200` de la machine sur laquelle l'application est déployée. 
Si l'application est déployée localement sur un poste de travail, l'url est [`http://localhost:4200`](http://localhost:4200)

Pour démarrer les services de télémétrie (inutile si l'application Mycobot n'est pas en service):
`docker compose --profile monitoring up -d`

Suite à cette commande, l'interface de grafana devrait être accessible sur le port `3000` de la machine sur laquelle l'application est déployée.

Si déploiement local, l'url est [`http://localhost:3000`](http://localhost:3000)

Pour démarrer les tests de charge (l'application Mycobot doit être en service avant de procéder):
`docker compose --profile load-testing up -d`