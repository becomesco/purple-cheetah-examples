import type { FSDBRepository } from '@becomes/purple-cheetah-mod-fsdb/types';
import type { Todo } from '.';

export interface TodoRepoMethods {
  findAllByCompleted(completed: boolean): Promise<Todo[]>;
  findBySlug(slug: string): Promise<Todo | null>;
  findByIdOrSlug(idOrSlug: string): Promise<Todo | null>;
}

export type TodoRepo = FSDBRepository<Todo, TodoRepoMethods>;
