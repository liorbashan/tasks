import { ShopItem } from './ShopItem';
export interface IShopItemFactory {
    create(data: Partial<ShopItem>): ShopItem;
}
