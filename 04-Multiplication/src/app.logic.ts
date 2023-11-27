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
const outputPath = 'outputs';

if (!fs.existsSync(path.join(outputPath))) {
  fs.mkdirSync(path.join(outputPath), { recursive: true });
}

fs.writeFileSync(`outputs/tabla-${base}.txt`, output);
