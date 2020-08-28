import { IShoppingListFactory } from './IShoppingListFactory';
import { ShoppingList } from './ShoppingList';
import { v4 as uuidv4 } from 'uuid';

export class ShoppingListFactory implements IShoppingListFactory {
    create(data: Partial<ShoppingList>): ShoppingList {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }
        const model: ShoppingList = new ShoppingList();
        Object.assign(model, data);
        return model;
    }
}
