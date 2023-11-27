import fs from 'fs';
import path from 'path';

const arrayTabla = [];
const base = 5;

for (let index = 0; index < 10; index++) {
  const row = `${base} x ${index + 1} = ${base * (index + 1)}`;
  arrayTabla.push(row);
}

const header = `
===============================
\t Tabla del ${base}
===============================\n
`;

const output = header + arrayTabla.join('\n');

if (!fs.existsSync(path.join('outputs'))) {
  fs.mkdirSync(path.join('outputs'));
}

fs.writeFileSync(`outputs/tabla-${base}.txt`, output);
