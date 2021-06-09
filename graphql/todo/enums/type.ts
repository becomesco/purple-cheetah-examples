import { TodoType } from '../model';
import { createGraphqlEnum } from '@becomes/purple-cheetah-mod-graphql';

export const TodoTypeEnum = createGraphqlEnum({
  name: 'TodoType',
  values: Object.keys(TodoType),
});
