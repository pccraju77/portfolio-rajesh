const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the bad percentage text classes
// Old: class="text-xl font-black text-slate-400/80 group-hover:text-white transition-colors z-10 relative count-up"
// New: class="text-lg font-bold text-slate-300 tracking-wider group-hover:text-white transition-colors z-10 relative count-up"

content = content.replace(/class="text-xl font-black text-slate-400\/80 group-hover:text-white transition-colors z-10 relative count-up"/g, 
'class="text-lg font-bold text-slate-300 tracking-wider group-hover:text-white transition-colors z-10 relative count-up"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed percentage text styling.');
