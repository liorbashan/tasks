import { ShoppingListEntity } from '../models/shoppingList/ShoppingListEntity';
import { IShoppingListRepository } from './../interfaces/IShoppingListRepository';
import { ShoppingListInput } from '../graphql/types/ShoppingList';

export class ShoppingListService implements IShoppingListRepository {
    constructor(protected repo: IShoppingListRepository) {}

    async get(input: ShoppingListInput): Promise<ShoppingListEntity> {
        const result: ShoppingListEntity = await this.repo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input?: ShoppingListInput): Promise<ShoppingListEntity[]> {
        const result: ShoppingListEntity[] = await this.repo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: ShoppingListInput): Promise<ShoppingListEntity> {
        const result: ShoppingListEntity = await this.repo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: ShoppingListInput): Promise<ShoppingListEntity> {
        const result: ShoppingListEntity = await this.repo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
