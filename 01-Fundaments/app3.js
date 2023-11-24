const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

const workCount = content.split(' ');

console.log('Words:', workCount.length);

let reactWords = workCount.filter((word) =>
  word.toLowerCase().includes('react')
);

reactWords = content.match(/react/gi ?? []).length;

console.log('React:', reactWords);
