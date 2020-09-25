import { QueryUserInput, UpdateUserInput, AddUserInput } from '../../graphql/types/User';
import { logger } from './../../utils/Logger';
import { UserEntityFactory } from '../../models/user/UserEntityFactory';
import { UserEntity } from '../../models/user/UserEntity';
import { IUserRepository } from './../../interfaces/IUserRepository';
import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Service('UserRepository')
export class UserRepository implements IUserRepository {
    constructor(private userModelFactory: UserEntityFactory, protected dbConnection?: Connection) {}

    async add(data: Partial<AddUserInput>): Promise<UserEntity | null> {
        let inserted: UserEntity | null = null;
        const user: UserEntity = this.userModelFactory.create(data as Partial<UserEntity>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('users').values([user]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: user.id });
        }
        return inserted;
    }
    async update(data: Partial<UpdateUserInput>): Promise<UserEntity | null> {
        let model: UserEntity | null = null;
        try {
            const id: string = data.id!;
            delete data.id;
            const query = this.getDbConnection()
                .createQueryBuilder()
                .update('users')
                .set(data as QueryDeepPartialEntity<UpdateUserInput>)
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
    async get(data: Partial<UserEntity>): Promise<UserEntity | null> {
        let model: UserEntity | null = null;
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"firstName"`, 'firstName')
            .addSelect(`"lastName"`, 'lastName')
            .addSelect(`"email"`, 'email')
            .addSelect(`"emailVerified"`, 'emailVerified')
            .addSelect(`"phone"`, 'phone')
            .addSelect(`"role"`, 'role')
            .addSelect(`"picture"`, 'picture')
            .addSelect(`"spaceId"`, 'spaceId')
            .addSelect(`"isActive"`, 'isActive')
            .addSelect(`"createdAt"`, 'createdAt')
            .from('users', 'users')
            .where('1=1');

        if (data?.id) {
            query.andWhere(`"id"=:id`, { id: data.id });
        }
        if (data?.email) {
            query.andWhere(`"email"=:email`, { email: data.email });
        }

        const dbResult: any = await query.getRawOne().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            model = this.userModelFactory.create(dbResult);
        }
        return model;
    }
    async getAll(data?: Partial<QueryUserInput>): Promise<UserEntity[]> {
        const models: UserEntity[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"firstName"`, 'firstName')
            .addSelect(`"lastName"`, 'lastName')
            .addSelect(`"email"`, 'email')
            .addSelect(`"emailVerified"`, 'emailVerified')
            .addSelect(`"phone"`, 'phone')
            .addSelect(`"role"`, 'role')
            .addSelect(`"picture"`, 'picture')
            .addSelect(`"spaceId"`, 'spaceId')
            .addSelect(`"isActive"`, 'isActive')
            .addSelect(`"createdAt"`, 'createdAt')
            .from('users', 'users')
            .where('1=1');

        if (data?.isActive) {
            query.andWhere(`"isActive"=:isActive`, { isActive: data.isActive });
        }
        if (data?.id) {
            query.andWhere(`"id"=:id`, { id: data.id });
        }
        if (data?.lastName) {
            query.andWhere(`"lastName"=:lastName`, { lastName: data.lastName });
        }
        if (data?.firstName) {
            query.andWhere(`"firstName"=:firstName`, { firstName: data.firstName });
        }
        if (data?.email) {
            query.andWhere(`"email"=:email`, { email: data.email });
        }
        if (data?.spaceId) {
            query.andWhere(`"spaceId"=:spaceId`, { spaceId: data.spaceId });
        }

        const dbResult: any = await query.getRawMany().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult?.length > 0) {
            for (const item of dbResult) {
                models.push(this.userModelFactory.create(item));
            }
        }
        return models;
    }

    private getDbConnection(): Connection {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
