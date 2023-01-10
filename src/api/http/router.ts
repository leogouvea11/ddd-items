import Router, { RouterContext } from '@koa/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ItemsHTTPController } from './controller'

@injectable()
export class HTTPRouter {
  @inject(TYPES.ItemsHTTPController) private _controller: ItemsHTTPController

  get(): Router {
    return new Router()
      .get('/item', (ctx: RouterContext) => this._controller.listItems(ctx))
      .get('/item/:id', (ctx: RouterContext) => this._controller.getItem(ctx))
      .post('/item', (ctx: RouterContext) => this._controller.createItem(ctx))
  }
}
