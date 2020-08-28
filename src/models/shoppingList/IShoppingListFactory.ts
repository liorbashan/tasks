import { ShoppingList } from './ShoppingList';

export interface IShoppingListFactory {
    create(data: Partial<ShoppingList>): ShoppingList;
}
