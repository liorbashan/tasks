import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { ShoppingList } from './../../models/shoppingList/ShoppingList';
import { Connection, getConnection } from 'typeorm';
import { IShoppingListFactory } from './../../models/shoppingList/IShoppingListFactory';
import { IShoppingListRepository } from './../../interfaces/IShoppingListRepository';
import { ShoppingListInput } from '../../graphql/types/ShoppingListGql';

export class ShoppingListRepository implements IShoppingListRepository {
    constructor(protected factory: IShoppingListFactory, protected dbConnection?: Connection) {}

    async get(input: ShoppingListInput): Promise<ShoppingList> {
        let model: ShoppingList = new ShoppingList();
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"spaceId"`, 'spaceId')
            .from('shoppingLists', 'shoppingLists')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.spaceId) {
            query.andWhere(`"spaceId"=:spaceId`, { spaceId: input.spaceId });
        }

        const dbResult: any = await query.getRawOne().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            model = this.factory.create(dbResult);
        }
        return model;
    }
    async getAll(input?: ShoppingListInput): Promise<ShoppingList[]> {
        const models: ShoppingList[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"spaceId"`, 'spaceId')
            .from('shoppingLists', 'shoppingLists')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.spaceId) {
            query.andWhere(`"spaceId"=:spaceId`, { spaceId: input.spaceId });
        }

        const dbResult: any = await query.getRawMany().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult?.length > 0) {
            for (const item of dbResult) {
                models.push(this.factory.create(item));
            }
        }
        return models;
    }
    async add(input: ShoppingListInput): Promise<ShoppingList> {
        let inserted: ShoppingList = new ShoppingList();
        const model: ShoppingList = this.factory.create(input as Partial<ShoppingList>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('shoppingLists').values([model]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: model.id });
        }
        return inserted;
    }
    async update(input: ShoppingListInput): Promise<ShoppingList> {
        let model: ShoppingList = this.factory.create(input as Partial<ShoppingList>);
        const query = this.getDbConnection()
            .createQueryBuilder()
            .update('shoppingLists')
            .set(input as QueryDeepPartialEntity<ShoppingListInput>)
            .where(`"id"=:id`, { id: input.id });
        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (dbResult) {
            model = await this.get({ id: input.id });
        }
        return model;
    }

    private getDbConnection(): Connection {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
