import {
  createBodyParserMiddleware,
  createCorsMiddleware,
  createPurpleCheetah,
} from '@becomes/purple-cheetah';
import { createFSDB } from '@becomes/purple-cheetah-mod-fsdb';
import { TodoController } from './controller';

export default createPurpleCheetah({
  port: 1280,
  logPath: 'todo/logs',
  modules: [
    createFSDB({
      output: 'todo/todo',
    }),
  ],
  middleware: [createCorsMiddleware(), createBodyParserMiddleware()],
  controllers: [TodoController],
});
