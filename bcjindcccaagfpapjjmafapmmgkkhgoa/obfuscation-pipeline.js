const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const JavaScriptObfuscator = require('javascript-obfuscator');

const obfuscationLevels = [
  {
    level: 0,
    name: 'Original',
    description: 'Unmodified source code',
    config: null
  },
  {
    level: 1,
    name: 'Minification',
    description: 'Whitespace and comment removal',
    config: {
      compact: true,
      comments: false
    }
  },
  {
    level: 2,
    name: 'Identifier Renaming',
    description: 'Variable and function name obfuscation',
    config: {
      compact: true,
      comments: false,
      identifierNamesGenerator: 'hexadecimal'
    }
  },
  {
    level: 3,
    name: 'Control Flow Obfuscation',
    description: 'Control flow flattening',
    config: {
      compact: true,
      comments: false,
      identifierNamesGenerator: 'hexadecimal',
      controlFlowFlattening: true,
      deadCodeInjection: false
    }
  },
  {
    level: 4,
    name: 'String Encoding + Dead Code',
    description: 'String encoding and dead code injection',
    config: {
      compact: true,
      comments: false,
      identifierNamesGenerator: 'hexadecimal',
      controlFlowFlattening: true,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.2,
      stringArray: true,
      rotateStringArray: true
    }
  }
];

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function removeDir(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
  } catch (err) {
    // Ignore if directory doesn't exist
  }
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}

async function walkDir(dir, fileExt = null) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await walkDir(fullPath, fileExt));
    } else if (!fileExt || item.name.endsWith(fileExt)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function runCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { 
      cwd, 
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    proc.on('error', reject);
  });
}

async function applyObfuscation(inputPath, outputPath, config) {
  await ensureDir(path.dirname(outputPath));
  
  if (!config) {
    // Level 0: Just copy the file without obfuscation
    await copyFile(inputPath, outputPath);
    return;
  }

  const sourceCode = await fs.readFile(inputPath, 'utf8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, config);
  await fs.writeFile(outputPath, obfuscationResult.getObfuscatedCode());
}

async function buildWithDeno() {
  console.log('Building with Deno...');
  
  // Try different ways to find deno
  const denoCommands = [
    'deno',
    '/usr/local/bin/deno',
    '/opt/homebrew/bin/deno',
    process.env.HOME + '/.deno/bin/deno'
  ];
  
  let denoCmd = null;
  for (const cmd of denoCommands) {
    try {
      await runCommand(cmd, ['--version']);
      denoCmd = cmd;
      break;
    } catch {
      continue;
    }
  }
  
  if (!denoCmd) {
    throw new Error('Deno not found. Please install Deno or ensure it\'s in your PATH.');
  }
  
  await runCommand(denoCmd, ['task', 'build']);
}

async function buildLevel(level) {
  console.log(`\nBuilding Level ${level.level}: ${level.name}`);
  
  const levelDir = `dist-level-${level.level}`;
  
  // Clean the output directory
  await removeDir(levelDir);
  
  // First, build with Deno to get the compiled output
  await buildWithDeno();
  
  // Create final output directory
  await ensureDir(levelDir);
  
  // Check if dist directory exists
  try {
    await fs.access('dist');
  } catch {
    throw new Error('Build failed: dist directory not found');
  }
  
  // Get all files from dist directory
  const allFiles = await walkDir('dist');
  
  for (const filePath of allFiles) {
    const relativePath = path.relative('dist', filePath);
    const outputPath = path.join(levelDir, relativePath);
    
    if (filePath.endsWith('.js')) {
      // Apply obfuscation to JS files
      console.log(`Processing ${relativePath}...`);
      await applyObfuscation(filePath, outputPath, level.config);
    } else {
      // Copy other files (CSS, manifest, etc.) directly
      await copyFile(filePath, outputPath);
    }
  }
  
  // Generate statistics
  await generateLevelStats(level.level, levelDir);
  
  console.log(`Level ${level.level} complete: ${levelDir}/`);
}

async function generateLevelStats(level, outputDir) {
  const stats = {
    level,
    timestamp: new Date().toISOString(),
    files: {}
  };
  
  const jsFiles = await walkDir(outputDir, '.js');
  
  for (const filePath of jsFiles) {
    const content = await fs.readFile(filePath, 'utf8');
    const relativePath = path.relative(outputDir, filePath);
    
    stats.files[relativePath] = {
      lines: content.split('\n').length,
      size: Buffer.byteLength(content, 'utf8'),
      chars: content.length
    };
  }
  
  // Append to global stats file
  const globalStatsPath = 'obfuscation-pipeline-stats.json';
  let globalStats = [];
  
  try {
    const existing = await fs.readFile(globalStatsPath, 'utf8');
    globalStats = JSON.parse(existing);
  } catch {
    // File doesn't exist yet
  }
  
  // Remove any existing entry for this level
  globalStats = globalStats.filter(s => s.level !== level);
  globalStats.push(stats);
  globalStats.sort((a, b) => a.level - b.level);
  
  await fs.writeFile(globalStatsPath, JSON.stringify(globalStats, null, 2));
}

async function main() {
  console.log('Starting obfuscation pipeline');
  console.log('Generating 5 levels using javascript-obfuscator v4.1.0\n');
  
  const startTime = Date.now();
  
  try {
    for (const level of obfuscationLevels) {
      await buildLevel(level);
    }
    
    const duration = (Date.now() - startTime) / 1000;
    
    console.log(`\nPipeline complete (${duration.toFixed(2)}s)`);
    console.log('Generated directories:');
    
    for (const level of obfuscationLevels) {
      console.log(`  dist-level-${level.level}/ - ${level.name}`);
    }
    
    console.log('\nStatistics: obfuscation-pipeline-stats.json');
    
  } catch (error) {
    console.error('Pipeline failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  obfuscationLevels,
  buildLevel
};