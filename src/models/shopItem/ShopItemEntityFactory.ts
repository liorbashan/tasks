import { IShopItemEntityFactory } from './IShopItemEntityFactory';
import { ShopItemEntity } from './ShopItemEntity';
import { v4 as uuidv4 } from 'uuid';

export class ShopItemEntityFactory implements IShopItemEntityFactory {
    create(data: Partial<ShopItemEntity>): ShopItemEntity {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }
        if (data.active === undefined || data.active === null) {
            data.active = true;
        }

        const model: ShopItemEntity = new ShopItemEntity();
        Object.assign(model, data);
        return model;
    }
}
