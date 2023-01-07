import Router, { RouterContext } from '@koa/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { HTTPController } from './controller'

@injectable()
export class HTTPRouter {
  @inject(TYPES.HTTPController) private _controller: HTTPController

  get(): Router {
    return new Router()
      .get('/item', (ctx: RouterContext) => this._controller.listItems(ctx))
      .get('/item/:id', (ctx: RouterContext) => this._controller.getItem(ctx))
      .post('/item', (ctx: RouterContext) => this._controller.createItem(ctx))
  }
}
