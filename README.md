# Projet 12 - Développez un tableau de bord d'analytics avec React

Vous travaillez en tant que développeur chez SportSee, une startup dédiée au coaching sportif. En pleine croissance, l’entreprise va aujourd’hui lancer une nouvelle version de la page profil de l’utilisateur. Cette page va notamment permettre à l’utilisateur de suivre le nombre de sessions réalisées ainsi que le nombre de calories brûlées.

### Contraintes Techniques :

- Utilisation de Recharts
- Utilisation de React
- Le projet est documenté avec JsDoc

## Installation

### Backend

1. Cloner le dépôt github disponible sur le repo à cette adresse : https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard
```bash
git clone https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard
```
2. Mise en place de l'environnement
```bash
yarn install
yarn start
```

### Frontend

1. Cloner le dépôt Github
```bash
git clone https://github.com/Goldawn/Projet-7---Groupomania.git
```
2. Mise en place de l'environnement 
```bash
npm install
npm start
```
Par défaut le port de lancement est 3000, tapez donc `y` dans le terminal lors du lancement pour lancer à la place sur le port 3001.

3. Tester l'application 

- L'application est accessible à l'adresse : `localhost:3000`

Naviguez ensuite vers l'utilisateur souhaité en ajoutant `/user/:userId`.
Les utlisateurs disponibles sont le `12` et le `18`.
Ajoutez ensuite la query url `?isfetched` si vous désirez faire appel à l'API au lieu des données mockées.

Exemple d'URL valide : `http://localhost:3001/user/18?isfetched`
Exemple d'url valide : `http://localhost:3001/user/18?isfetched`
