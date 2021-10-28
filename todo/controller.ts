import {
  createController,
  createControllerMethod,
  useStringUtility,
} from '@becomes/purple-cheetah';
import { HTTPStatus, StringUtility } from '@becomes/purple-cheetah/types';
import { TodoRepo } from './repository';
import type { BodyCheckerResult, Todo } from './types';
import { createBodyChecker } from './util/body-checker';

interface Setup {
  stringUtil: StringUtility;
}

export const TodoController = createController<Setup>({
  name: 'Todo controller',
  path: '/todo',
  setup() {
    return {
      stringUtil: useStringUtility(),
    };
  },
  methods({ stringUtil }) {
    return {
      getAll: createControllerMethod<void, { todos: Todo[] }>({
        path: '/all',
        type: 'get',
        async handler() {
          return {
            todos: await TodoRepo.findAll(),
          };
        },
      }),

      getByIdOrSlug: createControllerMethod<void, { todo: Todo }>({
        path: '/:idOrSlug',
        type: 'get',
        async handler({ request, errorHandler }) {
          const todo = await TodoRepo.methods.findByIdOrSlug(
            request.params.idOrSlug,
          );
          if (!todo) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              `Todo with ID or Slug "${request.params.idOrSlug}" does not exist.`,
            );
          }
          return {
            todo,
          };
        },
      }),

      create: createControllerMethod<
        BodyCheckerResult<{ name: string }>,
        { todo: Todo }
      >({
        type: 'post',
        preRequestHandler: createBodyChecker({
          name: {
            __type: 'string',
            __required: true,
          },
        }),
        async handler({ body, errorHandler }) {
          const slug = stringUtil.toSlug(body.name);
          if (await TodoRepo.methods.findBySlug(slug)) {
            throw errorHandler.occurred(
              HTTPStatus.BAD_REQUEST,
              `Todo with Slug "${slug}" already exist.`,
            );
          }
          const todo = await TodoRepo.add({
            _id: '',
            createdAt: 0,
            updatedAt: 0,
            completed: false,
            name: body.name,
            slug,
          });
          return {
            todo,
          };
        },
      }),

      update: createControllerMethod<
        BodyCheckerResult<{ _id: string; name?: string; completed?: string }>,
        { todo: Todo }
      >({
        type: 'put',
        preRequestHandler: createBodyChecker({
          _id: {
            __type: 'string',
            __required: true,
          },
          name: {
            __type: 'string',
            __required: false,
          },
          completed: {
            __type: 'boolean',
            __required: false,
          },
        }),
        async handler({ body, errorHandler }) {
          const todo = await TodoRepo.findById(body._id);
          if (!todo) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              `Todo with ID "${body._id}" does not exist.`,
            );
          }
          let changeDetected = false;
          if (body.name && todo.name !== body.name) {
            const slug = stringUtil.toSlug(body.name);
            if (await TodoRepo.methods.findBySlug(slug)) {
              throw errorHandler.occurred(
                HTTPStatus.BAD_REQUEST,
                `Todo with Slug "${slug}" already exist.`,
              );
            }
            changeDetected = true;
            todo.name = body.name;
            todo.slug = slug;
          }
          if (
            typeof body.completed === 'boolean' &&
            body.completed !== todo.completed
          ) {
            changeDetected = true;
            todo.completed = body.completed;
          }
          if (!changeDetected) {
            return {
              todo,
            };
          }
          const updatedTodo = await TodoRepo.update(todo);
          return {
            todo: updatedTodo,
          };
        },
      }),

      deleteById: createControllerMethod<void, { todo: Todo }>({
        path: '/:id',
        type: 'delete',
        async handler({ request, errorHandler }) {
          const todo = await TodoRepo.findById(request.params.id);
          if (!todo) {
            throw errorHandler.occurred(
              HTTPStatus.NOT_FOUNT,
              `Todo with ID "${request.params.id}" does not exist.`,
            );
          }
          await TodoRepo.deleteById(request.params.id);
          return {
            todo,
          };
        },
      }),
    };
  },
});
