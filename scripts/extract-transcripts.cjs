const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/to-process.json', 'utf8'));

for (const item of data.toProcess) {
  const file = item.file;
  console.log(`\n--- TRANSCRIPT: ${file} ---`);
  try {
    const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
    for (const line of lines) {
      const msg = JSON.parse(line);
      if (msg.role === 'user' || msg.role === 'assistant') {
        let text = '';
        if (msg.message && msg.message.content) {
          text = msg.message.content.map(c => c.text || '').join(' ');
        }
        if (text && text.trim().length > 0) {
          console.log(`[${msg.role.toUpperCase()}] ${text.substring(0, 500).replace(/\n/g, ' ')}`);
        }
      }
    }
  } catch (e) {
    console.error(`Error reading ${file}: ${e.message}`);
  }
}
