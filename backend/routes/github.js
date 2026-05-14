const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Maxou2003';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Récupère les repos de l'utilisateur
router.get('/repos', async (req, res) => {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
    
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: 100,
        },
        headers,
      }
    );

    // Filtrer et formater les données
    // SEULEMENT les repos avec le topic "portfolio" sont affichés
    const repos = response.data
      .filter(repo => repo.topics && repo.topics.includes('portfolio')) // 🔥 CONTRÔLE PAR TOPIC
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
      }));

    res.json(repos);
  } catch (error) {
    console.error('Erreur GitHub API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des repos' });
  }
});

// Récupère les infos utilisateur GitHub
router.get('/user', async (req, res) => {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
    
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers }
    );

    const user = {
      name: response.data.name,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
      location: response.data.location,
      blog: response.data.blog,
      followers: response.data.followers,
      following: response.data.following,
      publicRepos: response.data.public_repos,
    };

    res.json(user);
  } catch (error) {
    console.error('Erreur GitHub API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des infos utilisateur' });
  }
});

module.exports = router;
