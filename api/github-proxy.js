// api/github-proxy.js
export default async function handler(req, res) {
  const { method } = req;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 環境変数から取得

  if (method === 'POST') {
    try {
      const response = await fetch(`https://api.github.com/repos/NEL227/my-data-repo/contents/data/collected_data.txt`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
