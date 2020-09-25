import { isAuth } from './../auth/auth';
import { DeleteResult } from './../types/DeleteResult';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { ShopItem, ShopItemInput } from '../types/ShopItem';
import { Resolver, Query, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql';
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
        const shopItem: ShopItemEntity | null = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return shopItem ? new ShopItem(shopItem) : null;
    }

    @Mutation((returns) => ShopItem, { nullable: true })
    @UseMiddleware(isAuth)
    async AddShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItem | null> {
        const shopItem: ShopItemEntity | null = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItem(shopItem) : null;
    }

    @Mutation((returns) => ShopItem, { nullable: true })
    @UseMiddleware(isAuth)
    async UpdateShopItem(@Ctx() ctx: Context, @Arg('ShopItemInput', (type) => ShopItemInput) input: ShopItemInput): Promise<ShopItem | null> {
        const shopItem: ShopItemEntity | null = await this.service.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shopItem ? new ShopItem(shopItem) : null;
    }

    @Mutation((returns) => DeleteResult, { nullable: true })
    @UseMiddleware(isAuth)
    async DeleteShopItem(@Ctx() ctx: Context, @Arg('ID', (type) => String!) id: string): Promise<DeleteResult> {
        const result = await this.service.delete(id).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return new DeleteResult(result);
    }
}
