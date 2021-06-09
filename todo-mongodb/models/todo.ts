import { Schema } from 'mongoose';
import {
  MongoDBEntity,
  MongoDBEntitySchema,
} from '@becomes/purple-cheetah-mod-mongodb/types';
import { ObjectSchema } from '@becomes/purple-cheetah/types';

export interface Todo extends MongoDBEntity {
  name: string;
  description: string;
  completed: boolean;
}
export const TodoSchema = new Schema({
  ...MongoDBEntitySchema,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

export interface AddTodoData {
  name: string;
  description: string;
}
export const AddTodoDataSchema: ObjectSchema = {
  name: {
    __type: 'string',
    __required: true,
  },
  description: {
    __type: 'string',
    __required: true,
  },
};

export interface UpdateTodoData {
  _id: string;
  name?: string;
  description?: string;
  completed?: boolean;
}
export const UpdateTodoDataSchema: ObjectSchema = {
  _id: {
    __type: 'string',
    __required: true,
  },
  name: {
    __type: 'string',
    __required: false,
  },
  description: {
    __type: 'string',
    __required: false,
  },
  completed: {
    __type: 'boolean',
    __required: false,
  },
};
