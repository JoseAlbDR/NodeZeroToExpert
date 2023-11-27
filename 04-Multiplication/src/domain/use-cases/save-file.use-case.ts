import fs from 'fs';
import path from 'path';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {} // repository: StorageRepository

  execute({
    fileContent,
    destination = 'outputs',
    fileName = 'table.txt',
  }: SaveFileOptions): boolean {
    try {
      if (!fs.existsSync(path.join(destination))) {
        fs.mkdirSync(path.join(destination), { recursive: true });
      }
      fs.writeFileSync(`${destination}/${fileName}`, fileContent);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
