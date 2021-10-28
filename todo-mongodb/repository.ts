import { createMongoDBRepository } from '@becomes/purple-cheetah-mod-mongodb';
import { Todo, TodoRepoMethods, TodoSchema } from './types';

export const TodoRepo = createMongoDBRepository<Todo, TodoRepoMethods>({
  name: 'Todo repository',
  collection: 'todos',
  schema: TodoSchema,
  methods({ mongoDBInterface }) {
    return {
      async findAllByCompleted(completed) {
        return mongoDBInterface.find({ completed });
      },
      async findByIdOrSlug(idOrSlug) {
        const result = await mongoDBInterface.findOne({ _id: idOrSlug });
        return result
          ? result
          : await mongoDBInterface.findOne({ slug: idOrSlug });
      },
      async findBySlug(slug) {
        return mongoDBInterface.findOne({ slug });
      },
    };
  },
});
