require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const githubRoutes = require('./routes/github');
const emailRoutes = require('./routes/email');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet()); // Ajoute les headers de sécurité
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '1mb' })); // Limite la taille des payloads

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/email', emailRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
