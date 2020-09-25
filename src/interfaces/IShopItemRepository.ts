import { ShopItemInput } from '../graphql/types/ShopItem';
import { ShopItemEntity } from '../models/shopItem/ShopItemEntity';

export interface IShopItemRepository {
    get(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null>;
    getAll(input: Partial<ShopItemInput>): Promise<ShopItemEntity[]>;
    add(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null>;
    update(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null>;
    delete(id: string): Promise<number>;
}
