import { TodoCollection } from './todo';
import { createPurpleCheetah } from '@becomes/purple-cheetah';
import { createFSDB } from '@becomes/purple-cheetah-mod-fsdb';
import { createGraphql } from '@becomes/purple-cheetah-mod-graphql';

createPurpleCheetah({
  port: 1280,
  modules: [
    createFSDB({
      output: 'gql-todo'
    }),
    createGraphql({
      rootName: 'ExampleGraphQL',
      graphiql: true,
      collections: [TodoCollection],
    }),
  ],
});
