export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const rawUrl = `${protocol}://${host}/api/raw?id=${id || ''}`;

  // Force text/plain for Roblox executor compatibility
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Detect web browser visits
  const isBrowser = userAgent.includes('mozilla') || 
                    userAgent.includes('chrome') || 
                    userAgent.includes('safari') || 
                    userAgent.includes('mobile');

  if (isBrowser) {
    // Browsers see ONLY the copyable loadstring command
    return res.status(200).send(`loadstring(game:HttpGet("${rawUrl}"))()`);
  } 

  if (!id) {
    return res.status(400).send('-- Error: Missing Script ID in request');
  }

  try {
    // Dynamically fetch the compiled code from Base44 database
    const base44Url = `https://YOUR-BASE44-APP.base44.app/api/script/${id}`;
    const response = await fetch(base44Url);

    if (!response.ok) {
      return res.status(404).send('-- Error: Script ID not found on server');
    }

    const obfuscatedCode = await response.text();
    return res.status(200).send(obfuscatedCode);
  } catch (error) {
    return res.status(500).send('-- Error: Failed to fetch script payload');
  }
}
