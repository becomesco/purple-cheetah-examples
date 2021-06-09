import {
  createBodyParserMiddleware,
  createCorsMiddleware,
  createPurpleCheetah,
  createRequestLoggerMiddleware,
} from '@becomes/purple-cheetah';
import { HelloWorldController } from './controller';

export const purpleCheetah = createPurpleCheetah({
  port: 1280,
  controllers: [HelloWorldController],
  middleware: [
    createRequestLoggerMiddleware(),
    createBodyParserMiddleware(),
    createCorsMiddleware(),
  ],
});
