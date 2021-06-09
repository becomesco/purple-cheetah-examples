import { TodoController } from './controllers';
import { createFSDB } from '@becomes/purple-cheetah-mod-fsdb';
import {
  createBodyParserMiddleware,
  createCorsMiddleware,
  createPurpleCheetah,
  createRequestLoggerMiddleware,
} from '@becomes/purple-cheetah';

createPurpleCheetah({
  port: 1280,
  controllers: [TodoController],
  middleware: [
    createCorsMiddleware(),
    createBodyParserMiddleware(),
    createRequestLoggerMiddleware(),
  ],
  modules: [createFSDB({})],
});
