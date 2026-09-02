export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const rawUrl = `${protocol}://${host}/api/raw?id=${id || ''}`;

  // Force text/plain so game:HttpGet works seamlessly in executors
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Detect web browser visits (Chrome, Safari, Mobile Browsers)
  const isBrowser = userAgent.includes('mozilla') || 
                    userAgent.includes('chrome') || 
                    userAgent.includes('safari') || 
                    userAgent.includes('mobile');

  if (isBrowser) {
    // Mobile/Desktop web browsers see ONLY the copyable loadstring
    return res.status(200).send(`loadstring(game:HttpGet("${rawUrl}"))()`);
  } 

  if (!id) {
    return res.status(400).send('-- Error: Missing Script ID in request');
  }

  try {
    // Fetches the compiled code directly from your Base44 app
    const base44Url = `https://luna-script-shield.base44.app/api/script/${id}`;
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
