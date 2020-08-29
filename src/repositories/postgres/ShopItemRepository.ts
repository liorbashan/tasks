import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { Connection, getConnection } from 'typeorm';
import { ShopItemEntity } from '../../models/shopItem/ShopItemEntity';
import { IShopItemEntityFactory } from '../../models/shopItem/IShopItemEntityFactory';
import { IShopItemRepository } from './../../interfaces/IShopItemRepository';
import { ShopItemInput } from '../../graphql/types/ShopItem';

export class ShopItemRepository implements IShopItemRepository {
    constructor(protected shopItemFactory: IShopItemEntityFactory, protected dbConnection?: Connection) {}

    async get(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        let model: ShopItemEntity | null = null;
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"active"`, 'active')
            .addSelect(`"imageUrl"`, 'imageUrl')
            .addSelect(`"shoppingListId"`, 'shoppingListId')
            .from(`shoppingItems`, 'shoppingItems')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.shoppingListId) {
            query.andWhere(`"shoppingListId"=:shoppingListId`, { shoppingListId: input.shoppingListId });
        }
        if (input?.active) {
            query.andWhere(`"active"=:active`, { active: input.active });
        }

        const dbResult: any = await query.getRawOne().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            model = this.shopItemFactory.create(dbResult);
        }
        return model;
    }
    async getAll(input: Partial<ShopItemInput>): Promise<ShopItemEntity[]> {
        const models: ShopItemEntity[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"active"`, 'active')
            .addSelect(`"imageUrl"`, 'imageUrl')
            .addSelect(`"shoppingListId"`, 'shoppingListId')
            .from('shoppingItems', 'shoppingItems')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.shoppingListId) {
            query.andWhere(`"shoppingListId"=:shoppingListId`, { shoppingListId: input.shoppingListId });
        }
        if (input?.active) {
            query.andWhere(`"active"=:active`, { active: input.active });
        }

        const dbResult: any = await query.getRawMany().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult?.length > 0) {
            for (const item of dbResult) {
                models.push(this.shopItemFactory.create(item));
            }
        }
        return models;
    }
    async add(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        let inserted: ShopItemEntity | null = null;
        const model: ShopItemEntity = this.shopItemFactory.create(input as Partial<ShopItemEntity>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('shoppingItems').values([model]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: model.id });
        }
        return inserted;
    }
    async update(input: Partial<ShopItemInput>): Promise<ShopItemEntity | null> {
        let model: ShopItemEntity | null = null;
        try {
            const id: string = input.id!;
            delete input.id;
            const query = this.getDbConnection()
                .createQueryBuilder()
                .update('shoppingItems')
                .set(input as QueryDeepPartialEntity<ShopItemInput>)
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
