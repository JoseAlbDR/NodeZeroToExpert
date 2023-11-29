import { SaveFile } from './../../../domain/use-cases/save-file.use-case';
import fs from 'fs';
describe('/domain/use-cases/save-file.use-case.ts', () => {
  afterEach(() => {
    if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf8',
    });

    expect(saveFile).toBeInstanceOf(SaveFile);
    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toContain(options.fileContent);
  });

  test('should save file with custom values', () => {
    const options = {
      fileContent: 'test content',
      fileName: 'test.txt',
      fileDestination: 'testoutput',
    };

    const filePath = `${options.fileDestination}/${options.fileName}`;

    const result = new SaveFile().execute(options);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const checkFile = fs.existsSync(filePath);

    expect(result).toBeTruthy();
    expect(fileContent).toContain(options.fileContent);
    expect(checkFile).toBeTruthy();
  });
});
