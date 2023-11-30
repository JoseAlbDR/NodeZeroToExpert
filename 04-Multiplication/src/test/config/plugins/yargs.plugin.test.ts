const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./../../../config/plugins/yargs.plugin');

  return yarg;
};

describe('config/plugins/yargs.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: './outputs',
      })
    );
  });

  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '7',
      '-l',
      '100',
      '-s',
      '-n',
      'mtable',
      '-d',
      'testing',
    ]);

    console.log(argv);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 7,
        l: 100,
        s: true,
        n: 'mtable',
        d: 'testing',
      })
    );
  });
});
