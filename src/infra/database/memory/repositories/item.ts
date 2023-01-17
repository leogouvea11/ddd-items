import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../types'
import { Item, baseItem } from '../../../../domain/item/item'
import { ItemRepository } from '../../../../domain/item/repository'
import { MemoryData } from '../memory-data'
import { ItemMapper } from '../mappers/item'

@injectable()
export class ItemMemoryRepository implements ItemRepository {
  @inject(TYPES.Database) private _database: MemoryData

  async findAll(): Promise<Item[]> {
    const items = await (<Promise<baseItem[]>>this._database.items.findAll())
    return items.map((item) => ItemMapper.toDomain(item))
  }

  async getById(id: string): Promise<Item> {
    const item = await this._database.items.getById<baseItem>(id)
    if (!item) {
      throw new Error(`Item no found ${id}`)
    }
    return ItemMapper.toDomain(item)
  }

  async insert(item: Item): Promise<Item> {
    const dtoItem = item.serialize()
    const inserted = await this._database.items.insert(dtoItem)
    return ItemMapper.toDomain(inserted)
  }
}
