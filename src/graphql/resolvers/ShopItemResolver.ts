import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { ShopItem, ShopItemInput } from '../types/ShopItem';
import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ShopItemEntity } from '../../models/shopItem';

@Resolver((of) => ShopItem)
export class ShopItemResolver {
    constructor(private service: IShopItemRepository) {
        if (!service) {
            this.service = Container.get('ShopItemService');
        }
    }

    @Query((returns) => [ShopItem], { nullable: true })
    async QueryShopItems(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput, { nullable: true }) input: ShopItemInput): Promise<ShopItem[]> {
        const shopItems: ShopItem[] = [];
        const models: ShopItemEntity[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                shopItems.push(new ShopItem(item));
            }
        }
        return shopItems;
    }

    @Query((returns) => ShopItem, { nullable: true })
    async GetShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItem | null> {
        const shopItem: ShopItemEntity = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return shopItem ? new ShopItem(shopItem) : null;
    }

    @Mutation((returns) => ShopItem, { nullable: true })
    async AddShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItem | null> {
        const shopItem: ShopItemEntity = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItem(shopItem) : null;
    }

    @Mutation((returns) => ShopItem, { nullable: true })
    async UpdateShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItem | null> {
        const shopItem: ShopItemEntity = await this.service.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItem(shopItem) : null;
    }
}
