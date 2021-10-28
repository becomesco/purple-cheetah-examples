import { useObjectUtility } from '@becomes/purple-cheetah';
import {
  ControllerMethodPreRequestHandler,
  HTTPStatus,
  ObjectSchema,
  ObjectUtilityError,
} from '@becomes/purple-cheetah/types';
import type { BodyCheckerResult } from '@todo-mongodb/types';

export function createBodyChecker<Body>(
  schema: ObjectSchema,
): ControllerMethodPreRequestHandler<BodyCheckerResult<Body>> {
  const objectUtil = useObjectUtility();

  return async ({ request, errorHandler }) => {
    const result = objectUtil.compareWithSchema(request.body, schema, 'body');
    if (result instanceof ObjectUtilityError) {
      throw errorHandler.occurred(HTTPStatus.BAD_REQUEST, result.message);
    }
    return {
      body: request.body,
    };
  };
}
