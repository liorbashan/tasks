import { ShopItemEntity } from './ShopItemEntity';
export interface IShopItemEntityFactory {
    create(data: Partial<ShopItemEntity>): ShopItemEntity;
}
