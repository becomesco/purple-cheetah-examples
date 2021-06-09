import { createGraphqlResolver } from '@becomes/purple-cheetah-mod-graphql';
import { GraphqlResolverType } from '@becomes/purple-cheetah-mod-graphql/types';
import type { TodoModel } from '../model';
import { TodoRepository } from '../repository';

export const TodoGetResolver = createGraphqlResolver<
  TodoModel | null,
  {
    id: string;
  }
>({
  name: 'get',
  type: GraphqlResolverType.QUERY,
  return: {
    type: 'Todo',
  },
  args: {
    id: 'String!',
  },
  async resolve({ id }) {
    return await TodoRepository.findById(id);
  },
});
