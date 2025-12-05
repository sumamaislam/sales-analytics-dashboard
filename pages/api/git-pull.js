import simpleGit from "simple-git";
import path from "path";

export default async function handler(req, res) {
  // Only allow POST requests (optional for security)
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

  try {
    // Path to your local project
    const repoPath = path.resolve("E:/Biztek-Projects/sales-analytics-dashboard");

    const git = simpleGit(repoPath);

    // Pull latest from main branch
    const pullResult = await git.pull("origin", "main");

    res.status(200).json({ message: "Repo pulled successfully", result: pullResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error pulling repo", error: err.message });
  }
}
