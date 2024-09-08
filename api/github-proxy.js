import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_NAME = 'my-data-repo';
    const FILE_PATH = 'data/collected_data.txt';
    const owner = 'NEL227';

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    try {
        if (req.method === 'GET') {
            // GitHubからファイルのSHAと内容を取得
            const { data } = await octokit.repos.getContent({
                owner,
                repo: REPO_NAME,
                path: FILE_PATH
            });

            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            res.status(200).json({ sha: data.sha, content });
        } else if (req.method === 'PUT') {
            const { sha, newData } = req.body;

            // 新しいデータをアップロード
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo: REPO_NAME,
                path: FILE_PATH,
                message: 'Update collected data',
                content: Buffer.from(newData, 'utf-8').toString('base64'),
                sha
            });

            res.status(200).json({ message: "Update successful" });
        } else {
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating file' });
    }
}
