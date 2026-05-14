// Script pour vérifier quels repos ont le topic "portfolio"
// Lancez avec: node check-portfolio-repos.js

const axios = require('axios');
require('dotenv').config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Maxou2003';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function checkPortfolioRepos() {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        params: { per_page: 100 },
        headers,
      }
    );

    const portfolioRepos = response.data.filter(repo =>
      repo.topics && repo.topics.includes('portfolio')
    );
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkPortfolioRepos();