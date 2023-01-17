import { Item } from './item'

export interface ItemRepository {
  findAll(): Promise<Item[]>
  getById(id: string): Promise<Item>
  insert(item: Item): Promise<Item>
}
