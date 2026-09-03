export default async function handler(req, res) {
  const { id, key } = req.query;

  // Check secret key parameter
  if (key === 'Delta-Secure-Key-99') {
    const githubUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
    const response = await fetch(githubUrl);

    if (!response.ok) {
      return res.status(404).send('-- Script not found on GitHub');
    }

    const scriptContent = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(scriptContent);
  }

  // Redirect anyone visiting without the key (like browser clicks)
  return res.redirect(302, 'https://www.youtube.com/channel/UCHreL65ooGTvhhv8rec37Sw/subscribe?sub_confirmation=1');
}
