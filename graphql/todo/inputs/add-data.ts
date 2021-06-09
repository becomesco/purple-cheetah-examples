import { createGraphqlInput } from '@becomes/purple-cheetah-mod-graphql';

export const TodoAddDataInput = createGraphqlInput({
  name: 'TodoAddData',
  fields: {
    name: 'String!',
    description: 'String!',
    type: 'TodoType!',
  },
});
