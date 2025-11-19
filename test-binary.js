import fs from 'fs';
import path from 'path';

// Test if the binary exists and is executable
const binaryPath = path.join(__dirname, 'dist', 'spectre');

if (fs.existsSync(binaryPath)) {
  const stats = fs.statSync(binaryPath);
  console.log('✅ Binary exists at:', binaryPath);
  console.log('✅ Binary is executable:', stats.mode & 0o100 ? 'Yes' : 'No');
  console.log('✅ Binary size:', (stats.size / 1024).toFixed(2), 'KB');
  
  // Try to read the first few lines to see if it has proper shebang
  const binaryContent = fs.readFileSync(binaryPath, 'utf8');
  if (binaryContent.startsWith('#!/usr/bin/env node')) {
    console.log('✅ Binary has proper shebang');
  } else {
    console.log('⚠️  Binary may be missing shebang');
  }
  
  console.log('\nBinary test completed successfully!');
} else {
  console.log('❌ Binary not found at:', binaryPath);
  process.exit(1);
}