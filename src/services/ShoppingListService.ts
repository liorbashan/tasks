import { ShoppingList } from './../models/shoppingList/ShoppingList';
import { IShoppingListRepository } from './../interfaces/IShoppingListRepository';
import { ShoppingListInput } from '../graphql/types/ShoppingListGql';

export class ShoppingListService implements IShoppingListRepository {
    constructor(protected repo: IShoppingListRepository) {}

    async get(input: ShoppingListInput): Promise<ShoppingList> {
        const result: ShoppingList = await this.repo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input?: ShoppingListInput): Promise<ShoppingList[]> {
        const result: ShoppingList[] = await this.repo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: ShoppingListInput): Promise<ShoppingList> {
        const result: ShoppingList = await this.repo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: ShoppingListInput): Promise<ShoppingList> {
        const result: ShoppingList = await this.repo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
