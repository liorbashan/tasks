import { ShopItemEntity } from '../models/shopItem/ShopItemEntity';
import { IShopItemRepository } from './../interfaces/IShopItemRepository';
import { ShopItemInput } from '../graphql/types/ShopItem';

export class ShopItemService implements IShopItemRepository {
    constructor(protected shopItemRepo: IShopItemRepository) {}

    async get(input: Partial<ShopItemInput>): Promise<ShopItemEntity> {
        const result: ShopItemEntity = await this.shopItemRepo.get(input).catch((error) => {
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
    async add(input: Partial<ShopItemInput>): Promise<ShopItemEntity> {
        const result: ShopItemEntity = await this.shopItemRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: Partial<ShopItemInput>): Promise<ShopItemEntity> {
        const result: ShopItemEntity = await this.shopItemRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
