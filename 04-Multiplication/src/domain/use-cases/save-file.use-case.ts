import fs from 'fs';
import path from 'path';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {} // repository: StorageRepository

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table.txt',
  }: SaveFileOptions): boolean {
    try {
      if (!fs.existsSync(path.join(fileDestination))) {
        fs.mkdirSync(path.join(fileDestination), { recursive: true });
      }
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
