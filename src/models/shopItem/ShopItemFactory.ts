import { IShopItemFactory } from './IShopItemFactory';
import { ShopItem } from './ShopItem';
import { v4 as uuidv4 } from 'uuid';

export class ShopItemFactory implements IShopItemFactory {
    create(data: Partial<ShopItem>): ShopItem {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }
        if (data.active === undefined || data.active === null) {
            data.active = true;
        }

        const model: ShopItem = new ShopItem();
        Object.assign(model, data);
        return model;
    }
}
