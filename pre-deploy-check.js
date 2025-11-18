#!/usr/bin/env node

// 🦷 DentalFlow Pre-Deployment Check Script
// Validates everything is ready for Vercel deployment

import fs from 'fs';
import path from 'path';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

let hasErrors = false;
let warnings = 0;

logInfo('🦷 DentalFlow - Pre-deployment validation');
console.log('');

// Check required files
const requiredFiles = [
  'package.json',
  'vercel.json',
  'vite.config.ts',
  'tsconfig.json',
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'index.html'
];

logInfo('Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    logSuccess(`${file} exists`);
  } else {
    logError(`${file} is missing`);
    hasErrors = true;
  }
});

// Check vercel.json configuration
logInfo('Validating vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  if (vercelConfig.framework === 'vite') {
    logSuccess('Framework correctly set to Vite');
  } else {
    logError('Framework should be set to "vite"');
    hasErrors = true;
  }
  
  if (vercelConfig.outputDirectory === 'dist') {
    logSuccess('Output directory correctly set to "dist"');
  } else {
    logError('Output directory should be "dist"');
    hasErrors = true;
  }
  
  if (vercelConfig.rewrites && vercelConfig.rewrites.length > 0) {
    logSuccess('SPA rewrites configured');
  } else {
    logError('Missing SPA rewrites configuration');
    hasErrors = true;
  }
  
} catch (error) {
  logError('vercel.json is invalid JSON');
  hasErrors = true;
}

// Check package.json
logInfo('Validating package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts.build) {
    logSuccess('Build script exists');
  } else {
    logError('Missing build script');
    hasErrors = true;
  }
  
  if (packageJson.scripts['build:production']) {
    logSuccess('Production build script exists');
  } else {
    logWarning('Consider adding build:production script');
    warnings++;
  }
  
  const requiredDeps = ['react', 'react-dom', 'vite'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      logSuccess(`${dep} dependency found`);
    } else {
      logError(`Missing dependency: ${dep}`);
      hasErrors = true;
    }
  });
  
} catch (error) {
  logError('package.json is invalid');
  hasErrors = true;
}

// Check TypeScript configuration
logInfo('Checking TypeScript setup...');
if (fs.existsSync('tsconfig.json') && fs.existsSync('tsconfig.app.json')) {
  logSuccess('TypeScript configuration files exist');
} else {
  logError('Missing TypeScript configuration');
  hasErrors = true;
}

// Check for Moroccan customizations
logInfo('Checking Morocco-specific customizations...');
try {
  const mockData = fs.readFileSync('src/lib/mock-data.ts', 'utf8');
  if (mockData.includes('MAD')) {
    logSuccess('MAD currency configured');
  } else {
    logWarning('MAD currency not found in mock data');
    warnings++;
  }
  
  if (mockData.includes('Maroc') || mockData.includes('Morocco') || mockData.includes('Casablanca')) {
    logSuccess('Moroccan location references found');
  } else {
    logWarning('No Moroccan location references found');
    warnings++;
  }
} catch (error) {
  logWarning('Could not verify Morocco-specific customizations');
  warnings++;
}

// Check for environment variables template
logInfo('Checking environment configuration...');
if (fs.existsSync('.env.example')) {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  if (envExample.includes('VITE_')) {
    logSuccess('Environment variables template exists with VITE_ prefix');
  } else {
    logWarning('Environment variables should use VITE_ prefix');
    warnings++;
  }
} else {
  logWarning('Missing .env.example file');
  warnings++;
}

// Check .vercelignore
logInfo('Checking deployment optimization...');
if (fs.existsSync('.vercelignore')) {
  logSuccess('.vercelignore file exists');
} else {
  logWarning('Missing .vercelignore file (recommended)');
  warnings++;
}

// Final summary
console.log('');
log('📊 Pre-deployment Summary:', 'blue');
console.log('');

if (hasErrors) {
  logError(`Found ${hasErrors ? 'critical errors' : 'no critical errors'}`);
  log('❌ Deployment is NOT ready. Please fix the errors above.', 'red');
} else {
  logSuccess('No critical errors found');
  
  if (warnings > 0) {
    logWarning(`Found ${warnings} warning${warnings > 1 ? 's' : ''} (non-critical)`);
  }
  
  log('✅ Your DentalFlow app is ready for Vercel deployment!', 'green');
  console.log('');
  logInfo('Next steps:');
  console.log('  1. Run: npm run build:production');
  console.log('  2. Run: vercel --prod');
  console.log('  3. Or use: ./deploy.sh');
  console.log('');
  log('🇲🇦 Ready for Moroccan dental practices!', 'green');
}

process.exit(hasErrors ? 1 : 0);