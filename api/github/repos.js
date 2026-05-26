const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Validation du username GitHub
function validateGithubUsername(username) {
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  return validPattern.test(username) && username.length > 0 && username.length < 40;
}

if (!validateGithubUsername(GITHUB_USERNAME)) {
  throw new Error('GITHUB_USERNAME invalide');
}

// API Route Vercel
export default async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json(reposWithLanguages);
  } catch (error) {
    console.error('Erreur GitHub API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des repos' });
  }
};
