import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain';

export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ error: 'No files were selected' });

    if (!Array.isArray(req.files.file)) req.body.files = [req.files.file];
    if (Array.isArray(req.files.file)) req.body.files = req.files.file;

    next();
  }

  static validateType(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { type } = req.params;

      if (!validTypes.includes(type))
        return res.status(400).json({
          error: `Invalid type ${type}, valid ones ${validTypes.join(', ')}`,
        });
      next();
    };
  }

  static validateExtension(validExtensions: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const files = req.body.files as UploadedFile[];

      files.forEach((file) => {
        const fileExtension = file.mimetype.split('/').at(-1) ?? '';

        if (!validExtensions.includes(fileExtension))
          throw res.status(400).json({
            error: `Invalid extension: ${fileExtension}, valid ones ${validExtensions.join(
              ', '
            )}`,
          });
      });

      next();
    };
  }
}
