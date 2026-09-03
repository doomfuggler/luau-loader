export default async function handler(req, res) {
  const { id, key } = req.query;

  if (key !== 'Delta-Secure-Key-99') {
    return res.redirect(302, 'https://www.youtube.com/channel/UCHreL65ooGTvhhv8rec37Sw/subscribe?sub_confirmation=1');
  }

  const response = await fetch(
    `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`,
    {
      headers: {
        Authorization: `token ${process.env.GH_TOKEN || ''}`
      }
    }
  );

  if (!response.ok) {
    return res.status(404).send('-- File not found on GitHub');
  }

  const code = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(code);
}
