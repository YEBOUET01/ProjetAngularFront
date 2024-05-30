# Applicattion de gestion des devoirs à rendre
Il sagit pour nous dans ce projet, dans le cadre de la mise en application de nos acquis du de ANGULAR, dispensé par M. Michel BUFFA, de poursuivre et achever une application de gestion des devoir à rendre.


## Binôme pour le projet
- SILUE CAMPBEL IBRAHIM FOUGNIGUE
- YEBOUET RICHMOND JUNIOR

## Contributions pour la réalisation

Frontend réalisé par: YEBOUET RICHMOND JUNIOR

Backend réalisé par: SILUE CAMPBEL IBRAHIM FOUGNIGUE


## Fonctionnalités attendues
### Ce que nous avons réalisé
- Ajouter une Toolbar et une SideBar/Sidenav pour la présentation
- Ajouter une gestion de login/password (code en dur dans le service d'authentification une liste de login/passwords valides)
- Ajouter de nouvelles propriétés au modèle des Assignments:
    Auteur (nom ou photo de l'élève)
    Matière (Base de données, Technologies Web, Grails, etc.)
        Une image sera associée à chaque matière et une photo du prof
    Note sur 20
    Remarques
- Améliorer l'affichage des Assignments
    Puisqu'on a ajouté de nouvelles propriétés, il faudra mettre à jour les différents endroits où les Assignments sont affichés/édités/saisis, en particulier :
        Par exemple, afficher dans la liste des Assignments chaque Assignment sous forme d'une Material Card, avec le titre, la date, l'élève, une petite image illustrant la matière, la photo du prof en petit en haut à droite.
    La vue détails montrera en plus les remarques, la note s'il a été rendu, etc.
    Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière)

### Ce que nous n'avons pas pu réaliser
- Optionnel (mais simple à faire): utiliser un Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments (éventuellement pour la modification)

### Ce que nous avons réalisé en plus
- Ajout de messages de notification (SnackBar Material)


## Pour faire tourner le projet sr votre machine, il faut:
### Clonez les repositories Github du frontend et du backend sur votre machine
- frontend: https://github.com/YEBOUET01/ProjetAngularFront
- backend: https://github.com/YEBOUET01/ProjetAngularBack

### Modifiez l'URL de l'API dans les différents fichiers de service du frontend
principalement dans le fichier assignment.service.ts

### installez les dépendances
pour le frontend et le backend, faire: npm install

### Exécutez les projets
- frontend: ng serve
backend: node server.js (ou "npm run start")

### Ouvrez les projets dans votre navigateur
- frontend: http://localhost:4200/home
- backend: http://localhost:8010/api/assignments

### Connectez-vous!
- En tant que admin: Idantifiant = 'admin', Mot de passe = 'admin'
- En tant qye utilisateur simple: Identifiant = 'user', Mot de passe = 'password'

## Hébergement du projet
Le projet est hébergé sur render.com. Vous pouvez y acceder via les liens suivants:
frontend:
backend: 
