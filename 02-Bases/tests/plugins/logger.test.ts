import 'jest';
import { buildLogger } from '../../src/plugins';
import { logger } from '../../src/plugins/logger.plugin';

describe('plugins/logger.plugin.ts', () => {
  test('buildLogger should return a function logger that have log and error methods', () => {
    const service = 'test';

    const logger = buildLogger(service);

    expect(typeof logger).toBe('object');
    expect(typeof logger.log).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  test('logger.log should log a message', () => {
    const winstonLoggerMock = jest.spyOn(logger, 'log');
    const message = 'test message';
    const service = 'test service';

    const customLogger = buildLogger(service);

    customLogger.log(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level: 'info',
        message,
        service,
      })
    );
  });
  test('logger.error should log a message', () => {
    const winstonLoggerMock = jest.spyOn(logger, 'error');
    const message = 'test message';
    const service = 'test service';

    const customLogger = buildLogger(service);

    customLogger.error(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message,
        service,
      })
    );
  });
});
