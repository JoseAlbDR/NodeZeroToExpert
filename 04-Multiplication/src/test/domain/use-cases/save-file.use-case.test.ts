import { SaveFile } from './../../../domain/use-cases/save-file.use-case';
import fs from 'fs';
describe('/domain/use-cases/save-file.use-case.ts', () => {
  const customOptions = {
    fileContent: 'test content',
    fileName: 'test.txt',
    fileDestination: 'testoutput',
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}`;

  afterEach(() => {
    if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });
    if (fs.existsSync(customOptions.fileDestination))
      fs.rmSync(customOptions.fileDestination, { recursive: true });
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
    const result = new SaveFile().execute(customOptions);
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf8' });
    console.log(fileContent);
    const checkFile = fs.existsSync(customFilePath);

    expect(result).toBeTruthy();
    expect(fileContent).toContain(customOptions.fileContent);
    expect(checkFile).toBeTruthy();
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    // Overwrite mkdir
    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Custom error message from testing');
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
  });
});
