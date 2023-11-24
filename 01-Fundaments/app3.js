const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

const workCount = content.split(' ');

console.log('Words:', workCount.length);

const reactWords = workCount.filter((word) =>
  word.toLowerCase().includes('react')
);

console.log('React:', reactWords.length);
