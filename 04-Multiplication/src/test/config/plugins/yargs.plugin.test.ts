const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./../../../config/plugins/yargs.plugin');

  return yarg;
};

describe('config/plugins/yargs.plugin.ts', () => {
  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    console.log(argv);

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
});
