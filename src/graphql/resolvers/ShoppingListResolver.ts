import { ShopItem } from './../../models/shopItem/ShopItem';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShoppingListRepository } from './../../interfaces/IShoppingListRepository';
import { ShoppingListGql, ShoppingListInput } from './../types/ShoppingListGql';
import { Resolver, Query, Ctx, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { ShoppingList } from '../../models/ShoppingList';
import { ShopItemGql } from '../types/ShopItemGql';

@Resolver((of) => ShoppingListGql)
export class ShoppingListResolver {
    constructor(private service: IShoppingListRepository, private shopItemService: IShopItemRepository) {
        if (!service) {
            this.service = Container.get('ShoppingListService');
        }
        if (!shopItemService) {
            this.shopItemService = Container.get('ShopItemService');
        }
    }

    @Query((returns) => [ShoppingListGql], { nullable: true })
    async QueryShoppingLists(@Ctx() ctx: Context, @Arg('ShoppingListInput', { nullable: true }) input: ShoppingListInput): Promise<ShoppingListGql[]> {
        const lists: ShoppingListGql[] = [];
        const models: ShoppingList[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                lists.push(new ShoppingListGql(item));
            }
        }
        return lists;
    }

    @Query((returns) => ShoppingListGql, { nullable: true })
    async GetShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput') input: ShoppingListInput): Promise<ShoppingListGql | null> {
        const shoppingList: ShoppingList = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return shoppingList ? new ShoppingListGql(shoppingList) : null;
    }

    @Mutation((returns) => ShoppingListGql, { nullable: true })
    async AddShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput') input: ShoppingListInput): Promise<ShoppingListGql | null> {
        const shoppingList: ShoppingList = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shoppingList ? new ShoppingListGql(shoppingList) : null;
    }

    @Mutation((returns) => ShoppingListGql, { nullable: true })
    async UpdateShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput') input: ShoppingListInput): Promise<ShoppingListGql | null> {
        const shoppingList: ShoppingList = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shoppingList ? new ShoppingListGql(shoppingList) : null;
    }

    @FieldResolver({ nullable: true })
    async shopItems(@Root() shoppingList: ShoppingListGql): Promise<ShopItemGql[]> {
        const shopItems: ShopItemGql[] = [];
        const items: ShopItem[] = await this.shopItemService.getAll({ shoppingListId: shoppingList.id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                shopItems.push(new ShopItemGql(item));
            }
        }
        return shopItems;
    }
}
