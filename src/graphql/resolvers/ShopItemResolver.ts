import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { ShopItemGql, ShopItemInput } from './../types/ShopItemGql';
import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ShopItem } from '../../models/shopItem';

@Resolver((of) => ShopItemGql)
export class ShopItemResolver {
    constructor(private service: IShopItemRepository) {
        if (!service) {
            this.service = Container.get('ShopItemService');
        }
    }

    @Query((returns) => [ShopItemGql], { nullable: true })
    async QueryShopItems(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput, { nullable: true }) input: ShopItemInput): Promise<ShopItemGql[]> {
        const shopItems: ShopItemGql[] = [];
        const models: ShopItem[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                shopItems.push(new ShopItemGql(item));
            }
        }
        return shopItems;
    }

    @Query((returns) => ShopItemGql, { nullable: true })
    async GetShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItemGql | null> {
        const shopItem: ShopItem = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return shopItem ? new ShopItemGql(shopItem) : null;
    }

    @Mutation((returns) => ShopItemGql, { nullable: true })
    async AddShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItemGql | null> {
        const shopItem: ShopItem = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItemGql(shopItem) : null;
    }

    @Mutation((returns) => ShopItemGql, { nullable: true })
    async UpdateShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItemGql | null> {
        const shopItem: ShopItem = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItemGql(shopItem) : null;
    }
}
