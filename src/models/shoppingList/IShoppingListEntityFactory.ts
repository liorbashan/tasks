import { ShoppingListEntity } from './ShoppingListEntity';

export interface IShoppingListEntityFactory {
    create(data: Partial<ShoppingListEntity>): ShoppingListEntity;
}
