import { RouterContext } from '@koa/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { Item } from '../../domain/item'
import { ItemService } from '../../app/item'
import { validateCreateItem } from './validation/item'

@injectable()
export class ItemsHTTPController {
  @inject(TYPES.ItemService) private _itemService: ItemService

  public async listItems(ctx: RouterContext): Promise<void> {
    const items = await this._itemService.findAll()
    ctx.body = items.map((item) => item.serialize())
  }

  public async getItem(ctx: RouterContext): Promise<void> {
    const item = await this._itemService.getById(ctx.params.id)
    ctx.body = item.serialize()
  }

  public async createItem(ctx: RouterContext): Promise<void> {
    const input = validateCreateItem(
      ctx.request.body as Record<string, unknown>,
    )
    const item = Item.create(input)
    const created = await this._itemService.create(item)

    ctx.body = created.serialize()
  }
}
