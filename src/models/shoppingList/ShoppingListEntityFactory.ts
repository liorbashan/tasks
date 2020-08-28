import { IShoppingListEntityFactory } from './IShoppingListEntityFactory';
import { ShoppingListEntity } from './ShoppingListEntity';
import { v4 as uuidv4 } from 'uuid';

export class ShoppingListEntityFactory implements IShoppingListEntityFactory {
    create(data: Partial<ShoppingListEntity>): ShoppingListEntity {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }
        const model: ShoppingListEntity = new ShoppingListEntity();
        Object.assign(model, data);
        return model;
    }
}
