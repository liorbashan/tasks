import { Common } from './../../utils/Common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { ShoppingListEntity } from '../../models/shoppingList/ShoppingListEntity';
import { Connection, getConnection } from 'typeorm';
import { IShoppingListEntityFactory } from '../../models/shoppingList/IShoppingListEntityFactory';
import { IShoppingListRepository } from './../../interfaces/IShoppingListRepository';
import { ShoppingListInput } from '../../graphql/types/ShoppingList';

export class ShoppingListRepository implements IShoppingListRepository {
    constructor(protected factory: IShoppingListEntityFactory, protected dbConnection?: Connection) {}

    async get(input: ShoppingListInput): Promise<ShoppingListEntity | null> {
        let model: ShoppingListEntity | null = null;
        if (Common.allPropertiesAreNull(input)) {
            return model;
        }
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
    async getAll(input?: ShoppingListInput): Promise<ShoppingListEntity[]> {
        const models: ShoppingListEntity[] = [];
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
    async add(input: ShoppingListInput): Promise<ShoppingListEntity | null> {
        let inserted: ShoppingListEntity | null = null;
        const model: ShoppingListEntity = this.factory.create(input as Partial<ShoppingListEntity>);
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
    async update(input: ShoppingListInput): Promise<ShoppingListEntity | null> {
        let model: ShoppingListEntity | null = null;
        try {
            const id: string = input.id!;
            delete input.id;
            const query = this.getDbConnection()
                .createQueryBuilder()
                .update('shoppingLists')
                .set(input as QueryDeepPartialEntity<ShoppingListInput>)
                .where(`"id"=:id`, { id });
            const dbResult: any = await query.execute().catch((error) => {
                logger.error(error);
                throw new Error(error);
            });
            if (dbResult) {
                model = await this.get({ id });
            }
            return model;
        } catch (error) {
            throw new Error(`Are you missing property 'id' from the updated object?`);
        }
    }

    private getDbConnection(): Connection {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
