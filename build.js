import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';


async function buildBinary() {
  try {
    console.log('Building spectre binary...');

    // Build the binary
    await esbuild.build({
      entryPoints: ['./index.ts'],
      outfile: './dist/spectre',
      bundle: true,
      platform: 'node',
      target: 'node18',
      format: 'esm',
      external: ['node:*'],
      packages: 'external',
      write: true,
      minify: true,
      sourcemap: false,
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      banner: {
        js: ''
      },
      logLevel: 'info'
    });

    // Make it executable
    const binaryPath = path.resolve('./dist/spectre-binary');
    if (fs.existsSync(binaryPath)) {
      fs.chmodSync(binaryPath, 0o755);
      console.log('✅ Binary built successfully as', binaryPath);
      console.log('You can now run: spectre');
    } else {
      console.log('❌ Binary file was not created');
      process.exit(1);
    }
  } catch (error) {
    console.error('Build error:', error);
    process.exit(1);
  }
}

buildBinary();

