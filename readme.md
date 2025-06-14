# Mycobot 

**_NOTE:_** Le stockage du feedback utilise une clé éphémère (inadaptée pour la production) pour Firebase. Une tentative de *soumission de feedback* lors de l'utilisation du projet mènera probablement à une erreur 500 suite à l'*expiration* de la clé éphémère.

## Prérequis
*Docker* et *Docker Compose* sont requis pour suivre les indications de build & run suivantes.

## Démarrage (Run) de l'application
Pour démarrer l'application (le modèle de classification de champignons est déjà entraîné) :

`docker compose --profile app up -d && docker exec -it mycobot-ollama-1 ollama pull gemma3:latest`

La première partie de cette  commande va récupérer toutes les images docker nécessaire au fonctionnement et build les images du frontend et du backend. La seconde va récupérer le LLM gemma3 (nécessaire pour l'analyse de feedbacks utilisateurs). Gemma3 est un modèle de taille raisonnable (3.3GB) mais nécessite tout de même de l'espace de stockage et de la puissance de calcul suffisante pour son utilisation.

Une fois l'application en service : l'interface utilisateur est accessible sur le port `4200` de la machine sur laquelle l'application est déployée. 
Si l'application est déployée localement sur un poste de travail, l'url est [`http://localhost:4200`](http://localhost:4200)

### Démarrage du monitorage
Pour démarrer les services de télémétrie (inutile si l'application Mycobot n'est pas en service):

`docker compose --profile monitoring up -d`

Suite à cette commande, l'interface de grafana devrait être accessible sur le port `3000` de la machine sur laquelle l'application est déployée.

Si déploiement local, l'url est [`http://localhost:3000`](http://localhost:3000)

### Démarrage d'un test de charge
Pour démarrer un test de charge (l'application Mycobot doit être en service avant de procéder):

`docker compose --profile load-testing up -d`

L'interface de grafana devrait afficher les statistiques du test de charge dans `Dashboards` > `k6 Load Testing`

### Démarrage complet
Pour démarrer l'intégralité des services en une seule commande : 

`docker compose --profile all up -d`