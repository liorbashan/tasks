import { ShopItemEntity } from '../models/shopItem/ShopItemEntity';
import { IShopItemRepository } from './../interfaces/IShopItemRepository';
import { ShopItemInput } from '../graphql/types/ShopItem';

export class ShopItemService implements IShopItemRepository {
    constructor(protected shopItemRepo: IShopItemRepository) {}

    async get(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        const result: ShopItemEntity | null = await this.shopItemRepo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input: Partial<ShopItemInput>): Promise<ShopItemEntity[]> {
        const result: ShopItemEntity[] = await this.shopItemRepo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        const result: ShopItemEntity | null = await this.shopItemRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        const result: ShopItemEntity | null = await this.shopItemRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async delete(id: string): Promise<number> {
        const result: number = await this.shopItemRepo.delete(id).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
