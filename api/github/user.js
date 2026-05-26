const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur GitHub API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des infos utilisateur' });
  }
};
