import Joi from 'joi'
import Boom from '@hapi/boom'
import { RouterContext } from '@koa/router'

const mapErrorToHttpResponse = (err: Error | Boom): Boom => {
  if (err instanceof Boom) {
    return err
  }

  if (err instanceof Joi.ValidationError) {
    return Boom.badRequest('Invalid input', err.details)
  }

  return Boom.badImplementation("Server couldn't handle your request")
}

export const ErrorHandler = async (
  ctx: RouterContext,
  next: () => Promise<void>,
): Promise<void> => {
  try {
    await next()
  } catch (err) {
    const httpError = mapErrorToHttpResponse(err)

    ctx.status = httpError.output.statusCode
    ctx.body = {
      ...httpError.output.payload,
      ...(httpError.data ? { data: httpError.data } : {}),
      stack: err.stack,
    }

    ctx.app.emit('error', err, ctx)
  }
}
