const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Find all skill-cards and update their styling
const cardRegex = /<div\s+class="skill-card[^>]+>([\s\S]*?)<\/div>\s*<\/div>/g;

let updatedContent = content.replace(cardRegex, (match, innerHtml) => {
    // The match actually captures up to the first </div> which might not be the outer </div>. 
    // It's safer to use a more precise regex or string replacement.
    return match;
});

// Since regex is tricky with nested divs, let's just do targeted string replacements.

// 1. Update Card Container Classes
content = content.replace(/class="skill-card p-4 rounded-xl bg-dark-200 border border-slate-800 hover:border-primary\/50 transition-all group flex flex-col items-center"/g, 
'class="skill-card p-6 rounded-2xl bg-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group flex flex-col items-center relative overflow-hidden"');
content = content.replace(/class="skill-card p-4 rounded-xl bg-dark-200 border border-slate-800 hover:border-secondary\/50 transition-all group flex flex-col items-center"/g, 
'class="skill-card p-6 rounded-2xl bg-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500 group flex flex-col items-center relative overflow-hidden"');

// 2. Update Track Circle
content = content.replace(/<circle class="text-slate-700 stroke-current" stroke-width="8"/g, 
'<circle class="text-slate-800/80 stroke-current" stroke-width="3"');

// 3. Update Progress Circle
content = content.replace(/progress-ring__circle stroke-current" stroke-width="8"/g, 
'progress-ring__circle stroke-current drop-shadow-md group-hover:drop-shadow-[0_0_10px_currentColor] transition-all duration-500" stroke-width="6"');

// 4. Update Icon Container
content = content.replace(/<div class="absolute inset-0 flex items-center justify-center (text-[a-z0-9-]+) (text-2xl|text-3xl)( font-bold)?">/g, 
'<div class="absolute inset-0 flex items-center justify-center $1 $2$3 group-hover:scale-110 transition-transform duration-500">');

// 5. Update Title and Percentage
content = content.replace(/<h4 class="text-white font-bold mb-1">/g, '<h4 class="text-white font-bold text-sm tracking-wide mt-2 mb-1 z-10 relative">');
content = content.replace(/<p class="text-lg font-bold text-slate-400 count-up"/g, '<p class="text-xl font-black text-slate-400/80 group-hover:text-white transition-colors z-10 relative count-up"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated skill cards styling!');
