import type { MongoDBRepository } from '@becomes/purple-cheetah-mod-mongodb/types';
import type { Todo } from '.';

export interface TodoRepoMethods {
  findAllByCompleted(completed: boolean): Promise<Todo[]>;
  findBySlug(slug: string): Promise<Todo | null>;
  findByIdOrSlug(idOrSlug: string): Promise<Todo | null>;
}

export type TodoRepo = MongoDBRepository<Todo, TodoRepoMethods>;
