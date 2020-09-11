import { ShoppingListEntity } from './../../models/shoppingList/ShoppingListEntity';
import { ShopItemEntity } from '../../models/shopItem/ShopItemEntity';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShoppingListRepository } from './../../interfaces/IShoppingListRepository';
import { ShoppingList, ShoppingListInput } from '../types/ShoppingList';
import { Resolver, Query, Ctx, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { ShopItem } from '../types/ShopItem';

@Resolver((of) => ShoppingList)
export class ShoppingListResolver {
    constructor(private service: IShoppingListRepository, private shopItemService: IShopItemRepository) {
        if (!service) {
            this.service = Container.get('ShoppingListService');
        }
        if (!shopItemService) {
            this.shopItemService = Container.get('ShopItemService');
        }
    }

    @Query((returns) => [ShoppingList], { nullable: true })
    async QueryShoppingLists(@Ctx() ctx: Context, @Arg('ShoppingListInput', (type) => ShoppingListInput, { nullable: true }) input: ShoppingListInput): Promise<ShoppingList[]> {
        const lists: ShoppingList[] = [];
        const models: ShoppingListEntity[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                lists.push(new ShoppingList(item));
            }
        }
        return lists;
    }

    @Query((returns) => ShoppingList, { nullable: true })
    async GetShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput', (type) => ShoppingListInput) input: ShoppingListInput): Promise<ShoppingList | null> {
        const shoppingList: ShoppingListEntity | null = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return shoppingList ? new ShoppingList(shoppingList) : null;
    }

    @Mutation((returns) => ShoppingList, { nullable: true })
    async AddShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput', (type) => ShoppingListInput) input: ShoppingListInput): Promise<ShoppingList | null> {
        const shoppingList: ShoppingListEntity | null = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shoppingList ? new ShoppingList(shoppingList) : null;
    }

    @Mutation((returns) => ShoppingList, { nullable: true })
    async UpdateShoppingList(@Ctx() ctx: Context, @Arg('ShoppingListInput', (type) => ShoppingListInput) input: ShoppingListInput): Promise<ShoppingList | null> {
        const shoppingList: ShoppingListEntity | null = await this.service.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return shoppingList ? new ShoppingList(shoppingList) : null;
    }

    @FieldResolver((type) => [ShopItem], { nullable: true })
    async shopItems(@Root() shoppingList: ShoppingList): Promise<ShopItem[]> {
        const shopItems: ShopItem[] = [];
        const items: ShopItemEntity[] = await this.shopItemService.getAll({ shoppingListId: shoppingList.id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                shopItems.push(new ShopItem(item));
            }
        }
        return shopItems;
    }
}
