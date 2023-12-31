import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import { Uuid } from '../../config';

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  }

  public async uploadSingle(file: UploadedFile, folder: string = 'uploads') {
    try {
      const destination = path.resolve(__dirname, '../../../', folder);
      this.checkFolder(destination);

      const fileExtension = file.mimetype.split('/').at(-1) ?? '';
      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);

      return { fileName };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  public async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'webp']
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder))
    );

    return fileNames;
  }
}
