// Script pour vérifier quels repos ont le topic "portfolio"
// Lancez avec: node check-portfolio-repos.js

const axios = require('axios');
require('dotenv').config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Maxou2003';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function checkPortfolioRepos() {
  try {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    console.log(`🔍 Vérification des repos pour @${GITHUB_USERNAME}...\n`);

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

    console.log(`📊 Total repos: ${response.data.length}`);
    console.log(`✅ Repos avec topic "portfolio": ${portfolioRepos.length}\n`);

    if (portfolioRepos.length > 0) {
      console.log('🎯 Repos affichés sur le portfolio:');
      portfolioRepos.forEach(repo => {
        console.log(`  • ${repo.name} (${repo.language || 'N/A'})`);
      });
    } else {
      console.log('⚠️  Aucun repo avec le topic "portfolio" trouvé.');
      console.log('💡 Ajoutez le topic "portfolio" aux repos que vous voulez afficher!');
    }

    console.log('\n🔗 Comment ajouter le topic:');
    console.log('   1. Allez sur github.com/Maxou2003/NOM_DU_REPO/settings');
    console.log('   2. Dans "Topics", ajoutez: portfolio');
    console.log('   3. Sauvegardez');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkPortfolioRepos();