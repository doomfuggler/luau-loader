export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Detect Roblox Executors vs Web Browsers
  const isRobloxExecutor = userAgent.includes('roblox') || 
                           userAgent.includes('delta') || 
                           userAgent.includes('executor') || 
                           userAgent.includes('curl') ||
                           !userAgent.includes('mozilla');

  if (!isRobloxExecutor && (userAgent.includes('chrome') || userAgent.includes('safari') || userAgent.includes('edge'))) {
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    return res.status(200).send(`loadstring(game:HttpGet("${protocol}://${host}/api/raw?id=${id || ''}"))()`);
  } 

  if (!id) {
    return res.status(200).send('warn("Vercel Loader: Missing script ID parameter")');
  }

  try {
    // Fetch directly from your free GitHub repository
    const githubRawUrl = `https://raw.githubusercontent.com/doomfuggler/luau-loader/main/scripts/${id}.lua`;
    const response = await fetch(githubRawUrl);

    if (!response.ok) {
      return res.status(200).send(`warn("Vercel Loader Error: Script '${id}.lua' not found in GitHub scripts folder.")`);
    }

    const scriptCode = await response.text();
    return res.status(200).send(scriptCode);
  } catch (error) {
    return res.status(200).send('warn("Vercel Loader Error: Failed to fetch script from GitHub.")');
  }
}
