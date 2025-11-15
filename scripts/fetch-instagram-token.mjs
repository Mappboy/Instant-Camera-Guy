import https from 'https';
import fs from 'fs';
import path from 'path';

const appId = process.env.INSTAGRAM_APP_ID;
const appSecret = process.env.INSTAGRAM_APP_SECRET;

if (!appId || !appSecret) {
  console.error('Please set INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET environment variables.');
  process.exit(1);
}

const url = `https://graph.facebook.com/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`;

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.access_token) {
        const envFilePath = path.join(process.cwd(), '.env.local');
        const envContent = `VITE_INSTAGRAM_ACCESS_TOKEN=${parsedData.access_token}\n`;
        
        fs.writeFileSync(envFilePath, envContent);
        
        console.log('Access token fetched and saved to .env.local');
      } else {
        console.error('Failed to fetch access token:', parsedData);
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  });
}).on('error', (error) => {
  console.error('Error fetching access token:', error);
});
