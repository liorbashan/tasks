import { ShopItem } from './../models/shopItem/ShopItem';
import { IShopItemRepository } from './../interfaces/IShopItemRepository';
import { ShopItemInput } from '../graphql/types/ShopItemGql';

export class ShopItemService implements IShopItemRepository {
    constructor(protected shopItemRepo: IShopItemRepository) {}

    async get(input: Partial<ShopItemInput>): Promise<ShopItem> {
        const result: ShopItem = await this.shopItemRepo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input: Partial<ShopItemInput>): Promise<ShopItem[]> {
        const result: ShopItem[] = await this.shopItemRepo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: Partial<ShopItemInput>): Promise<ShopItem> {
        const result: ShopItem = await this.shopItemRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: Partial<ShopItemInput>): Promise<ShopItem> {
        const result: ShopItem = await this.shopItemRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
