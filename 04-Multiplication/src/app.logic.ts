import fs from 'fs';
import path from 'path';
import { yarg } from './config/plugins/yargs.plugin';

// console.log(yarg);

const { b: base, l: limit, s: show } = yarg;

const arrayTabla = [];

for (let index = 0; index < limit; index++) {
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

show
  ? console.log(output)
  : console.log(`File ${outputPath}/tabla-${base}.txt created`);

if (!fs.existsSync(path.join(outputPath))) {
  fs.mkdirSync(path.join(outputPath), { recursive: true });
}

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, output);
