export default async function handler(req, res) {
  const { id } = req.query;
  const authHeader = req.headers['x-executor-auth'];

  // Block anyone opening the URL in Chrome/Safari (browsers cannot pass custom headers on click)
  if (authHeader !== 'Delta-Secure-Key-99') {
    return res.redirect(302, 'https://www.youtube.com/channel/UCHreL65ooGTvhhv8rec37Sw/subscribe?sub_confirmation=1');
  }

  // Fetch from GitHub
  const githubUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
  const response = await fetch(githubUrl);

  if (!response.ok) {
    return res.status(404).send('-- Script not found');
  }

  const scriptContent = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(scriptContent);
}
