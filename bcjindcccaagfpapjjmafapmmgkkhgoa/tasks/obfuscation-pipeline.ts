import { pipe } from 'wire'
import { src, dist } from './lib/dirs.ts'
import { compile } from './lib/compile.ts'
import * as path from 'std/path/mod.ts'
import * as fs from 'std/fs/mod.ts'

interface ObfuscationLevel {
  level: number
  name: string
  description: string
  config: any
}

const obfuscationLevels: ObfuscationLevel[] = [
  {
    level: 0,
    name: 'Original',
    description: 'Unmodified source code - baseline for ground truth',
    config: null // No obfuscation
  },
  {
    level: 1,
    name: 'Minification',
    description: 'Whitespace and comment removal, statement concatenation',
    config: {
      compact: true,
      comments: false
    }
  },
  {
    level: 2,
    name: 'Identifier Renaming',
    description: 'Variable and function names replaced with random strings',
    config: {
      compact: true,
      comments: false,
      identifierNamesGenerator: 'hexadecimal'
    }
  },
  {
    level: 3,
    name: 'Control Flow Obfuscation',
    description: 'Control flow flattening, opaque predicates, bogus control flow',
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
    description: 'String literals encoded, 20% dead code injection',
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
]

async function applyObfuscation(inputPath: string, outputPath: string, config: any): Promise<void> {
  if (!config) {
    // Level 0: Just copy the file without obfuscation
    await Deno.copyFile(inputPath, outputPath)
    return
  }

  const JavaScriptObfuscator = await import('javascript-obfuscator')
  const sourceCode = await Deno.readTextFile(inputPath)
  
  const obfuscationResult = JavaScriptObfuscator.default.obfuscate(sourceCode, config)
  await Deno.writeTextFile(outputPath, obfuscationResult.getObfuscatedCode())
}

async function buildLevel(level: ObfuscationLevel): Promise<void> {
  console.log(`\n🔄 Building Level ${level.level}: ${level.name}`)
  console.log(`   ${level.description}`)
  
  const levelDir = `dist-level-${level.level}`
  
  // Clean the output directory
  try {
    await Deno.remove(levelDir, { recursive: true })
  } catch {
    // Directory doesn't exist, that's fine
  }
  
  // First, build with esbuild to get bundled JS files
  const tempDist = new (await import('wire')).Directory(`${levelDir}-temp`, { log: false })
  
  console.log(`   📦 Compiling with esbuild...`)
  await src.read().then(pipe(compile, tempDist.write))
  
  // Create final output directory
  await fs.ensureDir(levelDir)
  
  // Copy non-JS files directly
  const tempFiles = await tempDist.read()
  
  for (const [fileName, content] of Object.entries(tempFiles)) {
    const outputPath = path.join(levelDir, fileName)
    const outputDir = path.dirname(outputPath)
    await fs.ensureDir(outputDir)
    
    if (fileName.endsWith('.js')) {
      // Apply obfuscation to JS files
      console.log(`   🔀 Processing ${fileName}...`)
      const tempFilePath = path.join(tempDist.path, fileName)
      await applyObfuscation(tempFilePath, outputPath, level.config)
    } else {
      // Copy other files (CSS, manifest, etc.) directly
      await Deno.writeFile(outputPath, content as Uint8Array)
    }
  }
  
  // Clean up temp directory
  try {
    await Deno.remove(tempDist.path, { recursive: true })
  } catch {
    // Ignore cleanup errors
  }
  
  // Generate statistics
  await generateLevelStats(level.level, levelDir)
  
  console.log(`   ✅ Level ${level.level} complete: ${levelDir}/`)
}

async function generateLevelStats(level: number, outputDir: string): Promise<void> {
  const stats = {
    level,
    timestamp: new Date().toISOString(),
    files: {} as Record<string, { lines: number, size: number, chars: number }>
  }
  
  for await (const entry of fs.walk(outputDir, { exts: ['.js'] })) {
    if (entry.isFile) {
      const content = await Deno.readTextFile(entry.path)
      const relativePath = path.relative(outputDir, entry.path)
      
      stats.files[relativePath] = {
        lines: content.split('\n').length,
        size: new TextEncoder().encode(content).length,
        chars: content.length
      }
    }
  }
  
  await Deno.writeTextFile(
    path.join(outputDir, 'obfuscation-stats.json'),
    JSON.stringify(stats, null, 2)
  )
  
  // Also append to global stats file
  const globalStatsPath = 'obfuscation-pipeline-stats.json'
  let globalStats: any[] = []
  
  try {
    const existing = await Deno.readTextFile(globalStatsPath)
    globalStats = JSON.parse(existing)
  } catch {
    // File doesn't exist yet
  }
  
  // Remove any existing entry for this level
  globalStats = globalStats.filter(s => s.level !== level)
  globalStats.push(stats)
  globalStats.sort((a, b) => a.level - b.level)
  
  await Deno.writeTextFile(globalStatsPath, JSON.stringify(globalStats, null, 2))
}

async function main(): Promise<void> {
  console.log('🚀 Starting Obfuscation Pipeline for Master Thesis Research')
  console.log('   Generating 5 progressive obfuscation levels using javascript-obfuscator v4.1.0')
  
  const startTime = Date.now()
  
  for (const level of obfuscationLevels) {
    await buildLevel(level)
  }
  
  const duration = (Date.now() - startTime) / 1000
  
  console.log(`\n🎉 Pipeline Complete!`)
  console.log(`   Duration: ${duration.toFixed(2)}s`)
  console.log(`   Generated directories:`)
  
  for (const level of obfuscationLevels) {
    console.log(`   📁 dist-level-${level.level}/ - Level ${level.level}: ${level.name}`)
  }
  
  console.log(`\n📊 Statistics saved to: obfuscation-pipeline-stats.json`)
  
  // Generate summary report
  await generateSummaryReport()
}

async function generateSummaryReport(): Promise<void> {
  const globalStatsPath = 'obfuscation-pipeline-stats.json'
  
  try {
    const statsContent = await Deno.readTextFile(globalStatsPath)
    const allStats = JSON.parse(statsContent)
    
    let report = '# Obfuscation Pipeline Results\n\n'
    report += 'Generated for Master Thesis Research on LLM Robustness Against Code Obfuscation\n\n'
    report += `Generated on: ${new Date().toISOString()}\n\n`
    
    report += '## Summary by Level\n\n'
    report += '| Level | Name | Total Files | Total Lines | Total Size (bytes) |\n'
    report += '|-------|------|-------------|-------------|--------------------|\n'
    
    for (const levelStats of allStats) {
      const fileCount = Object.keys(levelStats.files).length
      const totalLines = Object.values(levelStats.files).reduce((sum: number, file: any) => sum + file.lines, 0)
      const totalSize = Object.values(levelStats.files).reduce((sum: number, file: any) => sum + file.size, 0)
      
      const levelInfo = obfuscationLevels.find(l => l.level === levelStats.level)
      report += `| ${levelStats.level} | ${levelInfo?.name || 'Unknown'} | ${fileCount} | ${totalLines} | ${totalSize} |\n`
    }
    
    report += '\n## Detailed File Analysis\n\n'
    
    for (const levelStats of allStats) {
      const levelInfo = obfuscationLevels.find(l => l.level === levelStats.level)
      report += `### Level ${levelStats.level}: ${levelInfo?.name}\n`
      report += `${levelInfo?.description}\n\n`
      
      if (levelInfo?.config) {
        report += '**Configuration:**\n```json\n'
        report += JSON.stringify(levelInfo.config, null, 2)
        report += '\n```\n\n'
      }
      
      report += '**Files:**\n'
      report += '| File | Lines | Size (bytes) | Characters |\n'
      report += '|------|-------|--------------|------------|\n'
      
      for (const [fileName, fileStats] of Object.entries(levelStats.files)) {
        const stats = fileStats as any
        report += `| ${fileName} | ${stats.lines} | ${stats.size} | ${stats.chars} |\n`
      }
      
      report += '\n'
    }
    
    await Deno.writeTextFile('OBFUSCATION_REPORT.md', report)
    console.log(`📄 Summary report saved to: OBFUSCATION_REPORT.md`)
    
  } catch (error) {
    console.error('Failed to generate summary report:', error)
  }
}

if (import.meta.main) {
  main().catch(console.error)
}