import { ShoppingList } from './../models/shoppingList/ShoppingList';
import { ShoppingListInput } from './../graphql/types/ShoppingListGql';

export interface IShoppingListRepository {
    get(input: ShoppingListInput): Promise<ShoppingList>;
    getAll(input?: ShoppingListInput): Promise<ShoppingList[]>;
    add(input: ShoppingListInput): Promise<ShoppingList>;
    update(input: ShoppingListInput): Promise<ShoppingList>;
}
