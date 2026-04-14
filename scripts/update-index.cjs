const fs = require('fs');

const indexPath = '/Users/jack/Documents/GitHub/total-wraps-and-tints-ltd/.cursor/hooks/state/continual-learning-index.json';
const data = JSON.parse(fs.readFileSync('scripts/to-process.json', 'utf8'));
const index = data.index;

for (const item of data.toProcess) {
  index.transcripts[item.file] = {
    mtimeMs: item.mtimeMs,
    lastProcessedAt: new Date().toISOString()
  };
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log('Index updated');
