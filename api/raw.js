export default async function handler(req, res) {
  const { id, raw } = req.query;

  // Serve raw script directly if &raw=true is present
  if (raw === 'true') {
    const githubUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
    const response = await fetch(githubUrl);

    if (!response.ok) {
      return res.status(404).send('-- Script not found');
    }

    const scriptContent = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(scriptContent);
  }

  // Redirect standard browser visits to YouTube
  return res.redirect(302, 'https://www.youtube.com/channel/UCHreL65ooGTvhhv8rec37Sw/subscribe?sub_confirmation=1');
}
