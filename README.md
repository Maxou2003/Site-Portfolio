# 👨‍💼 Portfolio - Maxence Martin

Portfolio personnel fullstack moderne présentant mes projets GitHub, mon CV et mes expériences professionnelles.

## 🚀 Stack Technique

- **Frontend**: React 18 + Vite
- **Icons**: Lucide React
- **Backend**: API Routes Vercel (Node.js serverless)
- **Email**: Resend pour les mails transactionnels
- **Hosting**: Vercel
- **API Externe**: GitHub REST API
- **Styling**: CSS3 avec variables CSS
- **HTTP Client**: Axios

## 📂 Structure du Projet

```
.
├── api/                           # API Routes Vercel (serverless)
│   ├── github/
│   │   ├── repos.js              # GET /api/github/repos - Récupère les repos avec topic 'portfolio'
│   │   └── user.js               # GET /api/github/user - Récupère les infos du profil
│   └── email/
│       └── send.js               # POST /api/email/send - Envoie les messages de contact
├── frontend/                      # Application React + Vite
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx               # Composant principal
│   │   ├── main.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── components/           # Composants réutilisables
│   │       ├── Header.jsx        # Section héro avec avatar GitHub
│   │       ├── Navbar.jsx        # Navigation responsive avec menu burger
│   │       ├── Projects.jsx      # Grille des projets GitHub
│   │       ├── CV.jsx            # Curriculum Vitae complet
│   │       ├── Contact.jsx       # Formulaire de contact + liens directs
│   │       └── *.css             # Styles des composants
│   ├── package.json
│   ├── vite.config.js
│   └── dist/                     # Build optimisé
├── vercel.json                    # Configuration Vercel pour déploiement
├── vite.config.js                 # Configuration Vite monorepo
└── package.json                   # Root package.json avec workspaces
```

## 🎯 Contrôle des Projets Affichés

Le portfolio affiche automatiquement **uniquement les repos GitHub** qui ont le topic `portfolio`.

### Comment ajouter un repo au portfolio :

1. **Allez sur votre repo GitHub** : `https://github.com/Maxou2003/mon-repo`
2. **Cliquez sur "Settings"** dans l'onglet du repo
3. **Descendez à la section "About"** puis cliquez sur "Add topics"
4. **Tapez** : `portfolio`
5. **Appuyez sur Entrée** pour valider
6. Le repo apparaîtra automatiquement sur le site au prochain déploiement !

### Les topics s'affichent aussi :
- Topics supplémentaires → affichés comme tags sur les cartes projets
- Vous pouvez combiner `portfolio` avec d'autres topics (`react`, `python`, etc.)

## ⚙️ Développement local

```bash
npm install
npm run dev        # http://localhost:3000
```

Avec Vercel CLI :
```bash
vercel dev
```

## 🎨 Composants React

| Composant | Description |
|-----------|-------------|
| **Header** | Section héro avec titre, sous-titre et avatar GitHub |
| **Navbar** | Navigation avec menu burger responsive |
| **Projects** | Grille des projets avec filtrage par topic |
| **CV** | Curriculum Vitae complet (formation, expérience, compétences) |
| **Contact** | Formulaire de contact + liens vers réseaux sociaux |

## 📡 API Endpoints

### GitHub
- `GET /api/github/user` - Profil GitHub (infos publiques, avatar, bio)
- `GET /api/github/repos` - Repos avec topic `portfolio` (nom, description, stars, forks, langages)

### Email
- `POST /api/email/send` - Envoie un message de contact
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```

## 📧 Configuration Email avec Resend

Resend est utilisé pour envoyer les messages de contact de manière fiable.

**Plan gratuit** :
- 100 emails/jour
- Sender: `onboarding@resend.dev`

**Domaine personnalisé** (plan payant) :
1. Achetez un domaine
2. Ajoutez-le dans le dashboard Resend
3. Configurez les DNS records
4. Mettez à jour `EMAIL_FROM` dans les variables Vercel

## 📝 Fonctionnalités

✅ **Affichage dynamique des projets GitHub**
- Récupération en temps réel des repos avec topic `portfolio`
- Affichage : nom, description, langage, stars, forks, topics
- Lien direct vers le repo GitHub

✅ **Curriculum Vitae complet**
- Formation
- Expérience professionnelle et internationale
- Compétences techniques
- Personnalisable via le composant CV.jsx

✅ **Section Contact**
- Liens vers email, GitHub, LinkedIn, téléphone
- Adresse physique
- Formulaire de contact intégré (via Resend)

✅ **Design moderne & responsive**
- Mobile-first approach
- Navigation burger menu pour mobile
- CSS Grid & Flexbox
- Icônes Lucide React
- Variables CSS pour la cohérence

✅ **Performance optimisée**
- Build Vite rapide
- Images optimisées
- Lazy loading du contenu

##  License

MIT

## 👤 Auteur

**Maxence Martin**
- 🔗 GitHub: [@Maxou2003](https://github.com/Maxou2003)
- 📧 Email: lemaila.maxence@gmail.com
- 💼 LinkedIn: [maxence-martin-dev](https://www.linkedin.com/in/maxence-martin-dev)
