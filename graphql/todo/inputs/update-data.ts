import { createGraphqlInput } from '@becomes/purple-cheetah-mod-graphql';

export const TodoUpdateData = createGraphqlInput({
  name: 'TodoUpdateData',
  fields: {
    _id: 'String!',
    name: 'String',
    description: 'String',
    completed: 'Boolean',
    type: 'TodoType',
  },
});
