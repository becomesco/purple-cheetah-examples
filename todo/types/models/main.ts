import {
  FSDBEntity,
  FSDBEntitySchema,
} from '@becomes/purple-cheetah-mod-fsdb/types';
import type { ObjectSchema } from '@becomes/purple-cheetah/types';

export interface Todo extends FSDBEntity {
  name: string;
  slug: string;
  completed: boolean;
}

export const TodoSchema: ObjectSchema = {
  ...FSDBEntitySchema,
  name: {
    __type: 'string',
    __required: true,
  },
  slug: {
    __type: 'string',
    __required: true,
  },
  completed: {
    __type: 'boolean',
    __required: true,
  },
};
