import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Check if we're on a Unix-like system
if (process.platform !== 'win32') {
  try {
    // Get the current directory where this script is located
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const binaryPath = path.join(__dirname, 'dist', 'spectre');
    
    // Check if binary exists
    if (!fs.existsSync(binaryPath)) {
      console.error('Error: Binary not found. Please run `npm run bundle` first.');
      process.exit(1);
    }
    
    // Try to install to /usr/local/bin
    const installPath = '/usr/local/bin/spectre';
    
    // Check if we have sudo privileges or are root
    try {
      execSync('sudo -v', { stdio: 'ignore' });
      console.log('Installing spectre binary to /usr/local/bin...');
      execSync(`sudo cp ${binaryPath} ${installPath}`);
      execSync(`sudo chmod +x ${installPath}`);
      console.log('✅ Successfully installed spectre to /usr/local/bin');
      console.log('You can now run: spectre');
    } catch (error) {
      console.log('⚠️  Cannot install to /usr/local/bin (no sudo privileges)');
      console.log('You can copy the binary manually:');
      console.log(`cp ${binaryPath} /usr/local/bin/spectre`);
      console.log('And make it executable:');
      console.log(`chmod +x /usr/local/bin/spectre`);
      
      // Suggest alternative - copy to local bin
      const localBin = path.join(process.env.HOME || '.', '.local', 'bin');
      if (!fs.existsSync(localBin)) {
        fs.mkdirSync(localBin, { recursive: true });
      }
      
      const localInstallPath = path.join(localBin, 'spectre');
      fs.copyFileSync(binaryPath, localInstallPath);
      fs.chmodSync(localInstallPath, 0o755);
      console.log(`✅ Installed to local bin: ${localInstallPath}`);
      console.log('Make sure ~/.local/bin is in your PATH');
    }
  } catch (error) {
    console.error('Error during installation:', error.message);
    process.exit(1);
  }
} else {
  console.log('Windows installation not supported by this script');
  console.log('Please copy dist/spectre.exe to your desired location manually');
}