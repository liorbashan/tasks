import { ShopItemInput } from '../graphql/types/ShopItemGql';
import { ShopItem } from '../models/shopItem/ShopItem';

export interface IShopItemRepository {
    get(input: Partial<ShopItemInput>): Promise<ShopItem>;
    getAll(input: Partial<ShopItemInput>): Promise<ShopItem[]>;
    add(input: Partial<ShopItemInput>): Promise<ShopItem>;
    update(input: Partial<ShopItemInput>): Promise<ShopItem>;
}
