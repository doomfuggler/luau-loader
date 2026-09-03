export default async function handler(req, res) {
  const { id, key } = req.query;

  // Set response type to plain text for Roblox
  res.setHeader('Content-Type', 'text/plain');

  // Block unauthorized requests without redirecting to HTML
  if (key !== 'Delta-Secure-Key-99') {
    return res.status(403).send('error("Unauthorized: Invalid key")');
  }

  // Fetch script from GitHub
  const githubUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
  const response = await fetch(githubUrl);

  if (!response.ok) {
    return res.status(404).send(`error("GitHub file '${id}.lua' not found")`);
  }

  const scriptContent = await response.text();
  return res.status(200).send(scriptContent);
}
