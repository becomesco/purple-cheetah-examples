import {
  createBodyParserMiddleware,
  createCorsMiddleware,
  createPurpleCheetah,
} from '@becomes/purple-cheetah';
import { createMongoDB } from '@becomes/purple-cheetah-mod-mongodb';
import { TodoController } from './controller';

export default createPurpleCheetah({
  port: 1280,
  logPath: 'todo-mongodb/logs',
  modules: [
    createMongoDB({
      selfHosted: {
        db: {
          host: 'localhost',
          name: 'purple-cheetah',
          port: 27017,
        },
        user: {
          name: 'purple',
          password: 'cheetah',
        },
      },
    }),
  ],
  middleware: [createCorsMiddleware(), createBodyParserMiddleware()],
  controllers: [TodoController],
});
