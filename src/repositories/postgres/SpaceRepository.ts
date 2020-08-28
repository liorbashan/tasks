import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { Connection, getConnection } from 'typeorm';
import { Space } from '../../models/space/Space';
import { ISpaceFactory } from '../../models/space/ISpaceFactory';
import { ISpaceRepository } from '../../interfaces/ISpaceRepository';
import { SpaceInput } from '../../graphql/types/SpaceGql';

export class SpaceRepository implements ISpaceRepository {
    constructor(private spaceFactory: ISpaceFactory, protected dbConnection?: Connection) {}

    async get(input: SpaceInput): Promise<Space> {
        let model: Space = new Space();
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"imgageUrl"`, 'imgageUrl')
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
    async getAll(input?: SpaceInput): Promise<Space[]> {
        const models: Space[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"imgageUrl"`, 'imgageUrl')
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
    async add(input: SpaceInput): Promise<Space> {
        let inserted: Space = new Space();
        const spaceModel: Space = this.spaceFactory.create(input as Partial<Space>);
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
    async update(input: SpaceInput): Promise<Space> {
        let model: Space = this.spaceFactory.create(input as Partial<Space>);
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