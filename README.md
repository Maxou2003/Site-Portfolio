# Portfolio - Maxence Martin

Portfolio personnel fullstack présentant mes projets GitHub et mon CV.

## 🚀 Stack Technique

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **API**: GitHub REST API
- **Styling**: CSS3 avec variables CSS

## 🎯 Contrôle des Projets Affichés

Le portfolio affiche automatiquement **uniquement les repos GitHub** qui ont le topic `portfolio`.

### Comment ajouter un repo au portfolio :

1. **Allez sur votre repo GitHub**
2. **Cliquez sur "Settings"** (dans l'onglet du repo)
3. **Descendez à "Topics"** (section "About")
4. **Ajoutez le topic** : `portfolio`
5. **Sauvegardez**

### Topics disponibles :
- `portfolio` - Affiche le repo sur le site
- Autres topics - Affichés comme tags sur la carte du projet

### Avantages :
- ✅ **Contrôle total** sur ce qui est affiché
- ✅ **Pas de code à modifier** à chaque nouveau projet
- ✅ **Topics visibles** comme tags sur les cartes projets
- ✅ **Mise à jour automatique** lors du prochain déploiement

### Exemple :
Si vous voulez afficher votre repo `mon-super-projet` :
1. Allez sur `https://github.com/Maxou2003/mon-super-projet/settings`
2. **Descendez à la section "Topics"** (dans "About")
3. **Cliquez sur "Add topics"**
4. **Tapez** : `portfolio`
5. **Appuyez sur Entrée** pour valider
6. Le repo apparaîtra automatiquement sur le site !

### Test rapide :
Pour tester, ajoutez temporairement le topic `portfolio` à un de vos repos existants.

### Outil de vérification :
Un script est disponible pour vérifier quels repos seront affichés :
```bash
cd backend
npm run check-repos
# ou directement: node check-portfolio-repos.js
```

### Personnaliser le topic :
Si vous préférez un autre mot-clé (ex: `showcase`, `featured`), modifiez cette ligne dans `backend/routes/github.js` :
```javascript
.filter(repo => repo.topics && repo.topics.includes('VOTRE_TOPIC'))
```

---

## 🔧 Installation

### Prérequis
- Node.js 16+
- npm ou yarn

### Backend

```bash
cd backend
npm install
```

**Configuration (.env)**:
```
PORT=5000
GITHUB_USERNAME=Maxou2003
GITHUB_TOKEN=           # Optional: Augmente la limite de l'API
```

Démarrage:
```bash
npm run dev    # Développement avec nodemon
npm start      # Production
```

### Frontend

```bash
cd frontend
npm install
```

Démarrage:
```bash
npm run dev    # Développement (http://localhost:3000)
npm run build  # Build production
npm run preview
```

## 📝 Fonctionnalités

✅ **Affichage des projets GitHub**
- Récupération automatique des repos via API GitHub
- Affichage de la description, du langage, des stars et forks
- Tags et topics

✅ **Curriculum Vitae**
- Formation
- Expérience professionnelle
- Expérience internationale
- Compétences techniques
- Langues
- Centres d'intérêts

✅ **Section Contact**
- Liens directs (email, GitHub, LinkedIn, téléphone)
- Formulaire de contact (à implémenter avec EmailJS ou similar)
- Design responsive

✅ **Design Responsive**
- Mobile-first
- Animations fluides
- Navigation sticky

## 🔗 API GitHub

Endpoints disponibles:

- `GET /api/github/repos` - Liste les repos publics (exclut les forks)
- `GET /api/github/user` - Informations de profil GitHub

## 🚀 Déploiement

### Avec Vercel/Netlify (Frontend)

```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### Avec Heroku/Railway (Backend)

Créer un `Procfile`:
```
web: node backend/server.js
```

## 📱 Améliorations Futures

- [ ] Implémenter le système d'envoi d'email (EmailJS)
- [ ] Ajouter un blog avec des articles
- [ ] Filtrer les projets par langage/technologie
- [ ] Dark mode
- [ ] Animations Framer Motion
- [ ] Intégration avec plus de réseaux sociaux

## 📄 License

MIT

## 👤 Auteur

**Maxence Martin**
- GitHub: [@Maxou2003](https://github.com/Maxou2003)
- Email: lexandre.maxence@gmail.com
- LinkedIn: [maxence-martin-dev](https://www.linkedin.com/in/maxence-martin-dev)
