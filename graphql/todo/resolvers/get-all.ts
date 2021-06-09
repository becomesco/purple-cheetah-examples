import { createGraphqlResolver } from '@becomes/purple-cheetah-mod-graphql';
import { GraphqlResolverType } from '@becomes/purple-cheetah-mod-graphql/types';
import { TodoRepository } from '../repository';

export const TodoGetAllResolver = createGraphqlResolver({
  name: 'getAll',
  type: GraphqlResolverType.QUERY,
  return: {
    type: 'TodoArray',
  },
  async resolve() {
    return await TodoRepository.findAll();
  },
});
