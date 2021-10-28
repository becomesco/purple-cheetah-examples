import type { FSDBEntity } from '@becomes/purple-cheetah-mod-fsdb/types';
import { MongoDBEntitySchemaString } from '@becomes/purple-cheetah-mod-mongodb/types';
import { Schema } from 'mongoose';

export interface Todo extends FSDBEntity {
  name: string;
  slug: string;
  completed: boolean;
}

export const TodoSchema = new Schema({
  ...MongoDBEntitySchemaString,
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
