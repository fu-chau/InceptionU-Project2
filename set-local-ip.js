// set-local-ip.js
import os from 'os';
import fs from 'fs';
import path from 'path';

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
};

const localIP = getLocalIP();
const envContent = `# Auto-generated .env.local — do not edit manually

LOCAL_IP=${localIP}
VITE_API_BASE_URL=http://${localIP}:3000
CLIENT_ORIGIN=http://${localIP}:5173
`;

const frontendEnvPath = path.join('client', '.env.local');
const backendEnvPath = path.join('server', '.env.local');

fs.writeFileSync(frontendEnvPath, envContent);
fs.writeFileSync(backendEnvPath, envContent);

console.log(`✅ .env.local written with IP: ${localIP}`);
console.log(`➡️  Frontend: ./client/.env.local`);
console.log(`➡️  Backend: ./server/.env.local`);
