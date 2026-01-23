# 🐾 Patte & Cie - Backend API

API REST pour la gestion d'une clinique vétérinaire développée avec Node.js, Express, Prisma et PostgreSQL (Neon).

## 📋 Table des matières

- [Description](#description)
- [Technologies](#technologies)
- [Architecture de la base de données](#architecture-de-la-base-de-données)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Endpoints API](#endpoints-api)
- [Authentification](#authentification)
- [Documentation](#documentation)
- [Gestion de projet](#gestion-de-projet)
- [Équipe](#équipe)

## 📖 Description

Patte & Cie est une application de gestion pour cliniques vétérinaires permettant de :
- Gérer les utilisateurs (propriétaires et vétérinaires)
- Enregistrer et suivre les animaux
- Planifier et consulter les visites médicales
- Gérer les traitements et vaccins
- Authentifier les utilisateurs avec JWT

## 🛠️ Technologies

- **Runtime** : Node.js
- **Framework** : Express 5.2.1
- **ORM** : Prisma 6.19.1
- **Base de données** : PostgreSQL (Neon Serverless)
- **Authentification** : JWT (jsonwebtoken)
- **Sécurité** : bcryptjs pour le hachage des mots de passe

## 🗄️ Architecture de la base de données

### Schéma de la base de données

![Schéma de la base de données](./database/mpd.pdf)

### 📁 Fichiers de la base de données

Le dossier `/database` contient les fichiers suivants :

- **mld.pdf** : Modèle Logique de Données
- **mpd.pdf** : Modèle Physique de Données
- **script.sql** : Script SQL complet pour la création de la base

### Script SQL complet (`/database/script.sql`)

Le script SQL inclut :
- Création de la base de données et des tables
- Contraintes PK (Primary Key) / FK (Foreign Key) / UNIQUE
- Script exécutable tel quel sur Neon

insertData.txt inclut un exemple de donnée :
- Jeu de données d'exemple (INSERT)


### Modèles principaux

- **User** : Utilisateurs (propriétaires, vétérinaires)
- **Animal** : Animaux enregistrés dans la clinique
- **Visit** : Visites médicales
- **Treatment** : Traitements prescrits
- **Vaccine** : Vaccins administrés

### Relations

- Un utilisateur peut posséder plusieurs animaux
- Un animal peut avoir plusieurs visites
- Une visite peut avoir plusieurs traitements et vaccins

## 📥 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Compte Neon Database (ou PostgreSQL local)

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/2025-10-CDA-ECO-P6/AE-backendPatteCie.git
cd AE-backendPatteCie
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
JWT_SECRET="le_secret_jwt"
PORT=4000
```

### Générer le client Prisma

```bash
npx prisma generate
```

### Créer les tables de la base de données

```bash
npx prisma db push
```

### Peupler la base de données (optionnel)

```bash
npm run seed
```

## 🚀 Démarrage

### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre sur `http://localhost:4000` par défaut.

## 🔌 Endpoints API

### Authentification (`/api/auth`)

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| POST | `/register` | Inscription d'un nouvel utilisateur | Non |
| POST | `/login` | Connexion utilisateur | Non |
| POST | `/logout` | Déconnexion utilisateur | Non |

### Utilisateurs (`/api/users`)

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| GET | `/` | Liste tous les utilisateurs | Non |
| GET | `/:id` | Récupère un utilisateur par ID | Non |
| POST | `/` | Crée un nouvel utilisateur | Non |
| PUT | `/:id` | Met à jour un utilisateur | Non |
| DELETE | `/:id` | Supprime un utilisateur | Non |

### Animaux (`/api/animals`)

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| GET | `/` | Liste tous les animaux | Non |
| GET | `/my` | Animaux de l'utilisateur connecté | Oui |
| GET | `/:id` | Récupère un animal par ID | Non |
| POST | `/` | Crée un nouvel animal | Oui |
| PUT | `/:id` | Met à jour un animal | Oui |
| DELETE | `/:id` | Supprime un animal | Oui |

### Visites (`/api/visits`)

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| GET | `/` | Liste toutes les visites | Non |
| GET | `/:id` | Récupère une visite par ID | Non |
| POST | `/` | Crée une nouvelle visite | Non |
| PUT | `/:id` | Met à jour une visite | Non |
| DELETE | `/:id` | Supprime une visite | Non |

### Traitements (`/api/treatments`)

| Méthode | Endpoint | Description | Auth requise |
|---------|----------|-------------|--------------|
| GET | `/` | Liste tous les traitements | Non |
| GET | `/:id` | Récupère un traitement par ID | Non |
| POST | `/` | Crée un nouveau traitement | Non |
| PUT | `/:id` | Met à jour un traitement | Non |
| DELETE | `/:id` | Supprime un traitement | Non |

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Obtenir un token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse :**
```json
{
  "message": "Connexion réussie",
  "user": {
    "user_id": 1,
    "name": "Dupont",
    "first_name": "Jean",
    "email": "user@example.com",
    "role": "veterinarian"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Utiliser le token

Le token est automatiquement stocké dans un cookie HTTP-only. Pour les requêtes nécessitant une authentification, incluez également le header :

```
Authorization: Bearer <votre_token>
```

## 📝 Structure du projet

```
backendPatteCie/
├── database/
│   ├── mld.pdf            # DOC Modèle Logique de Données
│   ├── mpd.pdf            # DOC Modèle Physique de Données
│   ├── script.sql         # DOC Création de table BDD
│   └── insertData.txt     # DOC Example data set (INSERT)
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── seed.js            # Script de peuplement
├── src/
│   ├── controllers/       # Logique métier
│   │   ├── animalController.js
│   │   ├── authController.js
│   │   ├── treatmentController.js
│   │   ├── userController.js
│   │   └── visitController.js
│   ├── core/              # Classes de base
│   │   ├── coreController.js
│   │   ├── errorMiddleware.js
│   │   └── httpErrors.js
│   ├── middleware/        # Middlewares
│   │   └── authMiddleware.js
│   ├── routes/            # Définition des routes
│   │   ├── animalRoute.js
│   │   ├── authRoute.js
│   │   ├── treatmentRoute.js
│   │   ├── userRoute.js
│   │   └── visitRoute.js
│   ├── app.js             # Configuration Express
│   ├── prisma.js          # Client Prisma
│   └── server.js          # Point d'entrée
├── .env                   # Variables d'environnement
├── .gitignore
├── package.json
└── README.md
```

## 📐 Structure des commits

Convention de nommage des commits :
```
USXX: Description de la modification
```

Exemples :
- `US16: UPDATE script SQL`
- `US25: Fix names for tables`
- `US28: Init`

## 📚 Documentation

### Documentation API

La documentation complète de l'API est disponible dans les formats suivants :

- **Swagger/OpenAPI** : [Documentation interactive](TODO: url swagger)
- **Bruno Collection** : [Collection Bruno](TODO: url bruno collection)

### Intégration Frontend

#### Comment consommer l'API

L'API REST utilise le format JSON pour les requêtes et les réponses. Voici les informations essentielles pour l'intégration avec un frontend :

**Base URL de l'API :**
```
http://localhost:4000/api
```

**Headers requis :**
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>" // Pour les routes protégées
}
```

#### Exemples de payload

**Inscription d'un utilisateur :**
```javascript
POST /api/auth/register
{
  "name": "Dupont",
  "first_name": "Jean",
  "email": "jean.dupont@example.com",
  "password": "MotDePasse123!",
  "role": "owner",
  "phone": "0612345678",
  "address": "123 Rue de la Paix, 75000 Paris"
}
```

**Création d'un animal :**
```javascript
POST /api/animals
{
  "name": "Max",
  "sex": "M",
  "date_of_birth": "2020-05-15",
  "species": "Chien",
  "race": "Labrador",
  "weight_kg": 30,
  "color": "Marron",
  "sterilizes": false,
  "chip_number": 123456789012345,
  "photo": "https://example.com/max.jpg",
  "owner_id": 1
}
```

**Création d'une visite :**
```javascript
POST /api/visits
{
  "date": "2025-01-25T14:30:00Z",
  "reason": "Vaccination annuelle",
  "comments": "Animal en bonne santé",
  "diagnosis": "RAS",
  "treatment_id": 1,
  "owner_id": 1,
  "veterinarian_id": 2
}
```

#### Codes de statut HTTP

| Code | Signification | Description |
|------|---------------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée avec succès |
| 400 | Bad Request | Données invalides ou champs manquants |
| 401 | Unauthorized | Authentification requise ou token invalide |
| 404 | Not Found | Ressource introuvable |
| 409 | Conflict | Conflit (ex: email déjà utilisé) |
| 500 | Internal Server Error | Erreur serveur |

#### Gestion des erreurs

Les réponses d'erreur suivent ce format :
```javascript
{
  "message": "Description de l'erreur",
  "error": "Type d'erreur (optionnel)"
}
```

### Changelog

Consultez le fichier [CHANGELOG.md](TODO: ./CHANGELOG.md) pour suivre l'évolution du projet et les versions.

## 📋 Gestion de projet

### GitHub Projects

Le projet utilise GitHub Projects pour la gestion des tâches avec les colonnes suivantes :

- **📥 Backlog** : Tâches à faire
- **🚧 In progress** : Tâches en développement
- **👀 In review** : Tâches en code review
- **✅ Done** : Tâches complétées

Chaque issue comprend :
- Labels appropriés (bug, feature, documentation, etc.)
- Checklists de sous-tâches
- Assignation aux membres de l'équipe

[Accéder au projet GitHub](https://github.com/orgs/2025-10-CDA-ECO-P6/projects/10/views/1)

## 📄 Licence

MIT License - [MIT License](TODO: url License MIT)

## 🔗 Liens utiles

- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Express](https://expressjs.com/)
- [Documentation Neon](https://neon.tech/docs)
- [Guide JWT](https://jwt.io/introduction)

---

## 👥 Équipe

| Nom | Rôle | GitHub | LinkedIn |
|-----|------|--------|----------|
| Emmanuel Saadi | Développeur | [Numazer](https://github.com/Numazer?tab=repositories) | [LinkedIn](https://www.linkedin.com/in/emmanuel-saadi-sarrault-669a03344/) |
| Amandine Delbouve | Développeuse | [amandinekemp](https://github.com/amandinekemp) | [LinkedIn](https://www.linkedin.com/in/amandinedelbouve/) |

## 🎥 Présentation & Déploiement

- **Présentation vidéo du projet** : [Voir la vidéo](TODO: url vidéo)
- **Site déployé** : [Accéder au site](TODO: url site déployé)

---
