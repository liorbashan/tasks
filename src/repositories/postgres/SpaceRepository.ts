import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { Connection, getConnection } from 'typeorm';
import { SpaceEntity } from '../../models/space/SpaceEntity';
import { ISpaceEntityFactory } from '../../models/space/ISpaceEntityFactory';
import { ISpaceRepository } from '../../interfaces/ISpaceRepository';
import { SpaceInput } from '../../graphql/types/Space';

export class SpaceRepository implements ISpaceRepository {
    constructor(private spaceFactory: ISpaceEntityFactory, protected dbConnection?: Connection) {}

    async get(input: SpaceInput): Promise<SpaceEntity> {
        let model: SpaceEntity = new SpaceEntity();
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"imageUrl"`, 'imageUrl')
            .from('spaces', 'spaces')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.description) {
            query.andWhere(`"description"=:description`, { description: input.description });
        }
        if (input?.imageUrl) {
            query.andWhere(`"imageUrl"=:imageUrl`, { imageUrl: input.imageUrl });
        }

        const dbResult: any = await query.getRawOne().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            model = this.spaceFactory.create(dbResult);
        }
        return model;
    }
    async getAll(input?: SpaceInput): Promise<SpaceEntity[]> {
        const models: SpaceEntity[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"imageUrl"`, 'imageUrl')
            .from('spaces', 'spaces')
            .where('1=1');

        if (input?.id) {
            query.andWhere('id=:id', { id: input.id });
        }
        if (input?.title) {
            query.andWhere('title=:title', { title: input.title });
        }
        if (input?.description) {
            query.andWhere('description=:description', { description: input.description });
        }
        if (input?.imageUrl) {
            query.andWhere('imageUrl=:imageUrl', { imageUrl: input.imageUrl });
        }

        const dbResult: any = await query.getRawMany().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult?.length > 0) {
            for (const item of dbResult) {
                models.push(this.spaceFactory.create(item));
            }
        }
        return models;
    }
    async add(input: SpaceInput): Promise<SpaceEntity> {
        let inserted: SpaceEntity = new SpaceEntity();
        const spaceModel: SpaceEntity = this.spaceFactory.create(input as Partial<SpaceEntity>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('spaces').values([spaceModel]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: spaceModel.id });
        }
        return inserted;
    }
    async update(input: SpaceInput): Promise<SpaceEntity> {
        let model: SpaceEntity = this.spaceFactory.create(input as Partial<SpaceEntity>);
        const query = this.getDbConnection()
            .createQueryBuilder()
            .update('spaces')
            .set(input as QueryDeepPartialEntity<SpaceInput>)
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
