import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { IShoppingListRepository } from './../../interfaces/IShoppingListRepository';
import { ShoppingListGql, ShoppingListInput } from './../types/ShoppingListGql';
import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { ShoppingList } from '../../models/ShoppingList';

@Resolver((of) => ShoppingListGql)
export class ShoppingListResolver {
    constructor(private service: IShoppingListRepository) {
        if (!service) {
            this.service = Container.get('ShoppingListService');
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
}
