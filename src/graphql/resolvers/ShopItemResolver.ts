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
    async QueryShopItems(@Ctx() ctx: Context, @Arg('ShopItemInput', { nullable: true }) input: ShopItemInput): Promise<ShopItemGql[]> {
        const users: ShopItemGql[] = [];
        const models: ShopItem[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                users.push(new ShopItemGql(item));
            }
        }
        return users;
    }

    @Query((returns) => ShopItemGql, { nullable: true })
    async GetShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput') input: ShopItemInput): Promise<ShopItemGql | null> {
        const ShopItem: ShopItem = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return ShopItem ? new ShopItemGql(ShopItem) : null;
    }

    @Mutation((returns) => ShopItemGql, { nullable: true })
    async AddShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput') input: ShopItemInput): Promise<ShopItemGql | null> {
        const ShopItem: ShopItem = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return ShopItem ? new ShopItemGql(ShopItem) : null;
    }

    @Mutation((returns) => ShopItemGql, { nullable: true })
    async UpdateShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput') input: ShopItemInput): Promise<ShopItemGql | null> {
        const ShopItem: ShopItem = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return ShopItem ? new ShopItemGql(ShopItem) : null;
    }
}
