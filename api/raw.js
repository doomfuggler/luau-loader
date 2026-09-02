export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // Redirect browser visitors away so they cannot view raw code in Chrome/Safari
  const isBrowser = userAgent.includes('mozilla') || userAgent.includes('chrome') || userAgent.includes('safari');

  if (isBrowser) {
    return res.redirect(302, 'https://www.youtube.com/channel/UCHreL65ooGTvhhv8rec37Sw/subscribe?sub_confirmation=1');
  }

  // Serve raw script to Roblox/Delta requests
  const githubUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
  const response = await fetch(githubUrl);

  if (!response.ok) {
    return res.status(404).send('-- Script not found');
  }

  const scriptContent = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(scriptContent);
}
