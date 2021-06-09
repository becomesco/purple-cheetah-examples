import { Todo, TodoSchema } from '../models';
import { createMongoDBRepository } from '@becomes/purple-cheetah-mod-mongodb';

export interface TodoRepositoryMethods {
  findAllByCompleted(completed: boolean): Promise<Todo[]>;
}
export const TodoRepository = createMongoDBRepository<
  Todo,
  TodoRepositoryMethods
>({
  name: 'Todo Repository',
  collection: 'todo',
  schema: TodoSchema,
  methods({ repo }) {
    return {
      async findAllByCompleted(completed) {
        return await repo.findAllBy({ completed });
      },
    };
  },
});
