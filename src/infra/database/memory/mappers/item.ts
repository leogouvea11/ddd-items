import { Item, baseItem } from '../../../../domain/item'

export class ItemMapper {
  public static toDomain(raw: baseItem): Item {
    return Item.create({
      id: raw.id,
      displayName: raw.displayName,
      sku: raw.sku,
      price: raw.price,
    })
  }
}
