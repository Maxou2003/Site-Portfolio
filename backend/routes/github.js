const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Maxou2003';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Validation du username GitHub
function validateGithubUsername(username) {
  // Accepte seulement alphanumériques, tirets et underscores
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  return validPattern.test(username) && username.length > 0 && username.length < 40;
}

if (!validateGithubUsername(GITHUB_USERNAME)) {
  throw new Error('GITHUB_USERNAME invalide');
}

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

    // Filtrer les repos avec le topic "portfolio"
    const portfolioRepos = response.data.filter(repo =>
      repo.topics && repo.topics.includes('portfolio')
    );

    // Pour les repos où language est null, récupérer les vraies langues
    const reposWithLanguages = await Promise.all(
      portfolioRepos.map(async (repo) => {
        let language = repo.language;

        // Si pas de langue principale, récupérer les détails des langues
        if (!language) {
          try {
            const languagesResponse = await axios.get(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
              { headers }
            );

            const languages = languagesResponse.data;
            if (Object.keys(languages).length > 0) {
              // Prendre la langue avec le plus de bytes
              language = Object.keys(languages).reduce((a, b) =>
                languages[a] > languages[b] ? a : b
              );
            }
          } catch (error) {
            console.warn(`Impossible de récupérer les langues pour ${repo.name}:`, error.message);
          }
        }

        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics,
        };
      })
    );

    res.json(reposWithLanguages);
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
