import fs from 'fs';
import path from 'path';
import { yarg } from './config/plugins/yargs.plugin';

console.log(yarg);

const arrayTabla = [];
const base = yarg.b;

for (let index = 0; index < yarg.l; index++) {
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

if (yarg.s) console.log(output);

if (!fs.existsSync(path.join(outputPath))) {
  fs.mkdirSync(path.join(outputPath), { recursive: true });
}

fs.writeFileSync(`outputs/tabla-${base}.txt`, output);
