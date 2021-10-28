import { createFSDBRepository } from '@becomes/purple-cheetah-mod-fsdb';
import { Todo, TodoRepoMethods, TodoSchema } from './types';

export const TodoRepo = createFSDBRepository<Todo, TodoRepoMethods>({
  name: 'Todo repository',
  collection: 'todos',
  schema: TodoSchema,
  methods({ repo }) {
    return {
      async findAllByCompleted(completed) {
        return repo.findAllBy((e) => e.completed === completed);
      },
      async findBySlug(slug) {
        return repo.findBy((e) => e.slug === slug);
      },
      async findByIdOrSlug(idOrSlug) {
        return repo.findBy((e) => e._id === idOrSlug || e.slug === idOrSlug);
      },
    };
  },
});
