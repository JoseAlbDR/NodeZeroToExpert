export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string) {
    throw new Error('Not implemented');
  }

  public uploadSingle(
    file,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {}

  public uploadMultiple(
    file,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {}
}
