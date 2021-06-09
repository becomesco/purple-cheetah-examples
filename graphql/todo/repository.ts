import { TodoModel, TodoSchema } from './model';
import { createFSDBRepository } from '@becomes/purple-cheetah-mod-fsdb';

export interface TodoRepositoryMethods {
  findAllByCompleted(completed: boolean): Promise<TodoModel[]>;
}
export const TodoRepository = createFSDBRepository<
  TodoModel,
  TodoRepositoryMethods
>({
  name: 'Todo Repository',
  collection: 'todo-fsdb',
  schema: TodoSchema,
  methods({ repo }) {
    return {
      async findAllByCompleted(completed) {
        return await repo.findAllBy((e) => e.completed === completed);
      },
    };
  },
});
