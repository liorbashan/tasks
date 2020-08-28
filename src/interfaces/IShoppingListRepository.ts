import { ShoppingListEntity } from '../models/shoppingList/ShoppingListEntity';
import { ShoppingListInput } from '../graphql/types/ShoppingList';

export interface IShoppingListRepository {
    get(input: ShoppingListInput): Promise<ShoppingListEntity>;
    getAll(input?: ShoppingListInput): Promise<ShoppingListEntity[]>;
    add(input: ShoppingListInput): Promise<ShoppingListEntity>;
    update(input: ShoppingListInput): Promise<ShoppingListEntity>;
}
