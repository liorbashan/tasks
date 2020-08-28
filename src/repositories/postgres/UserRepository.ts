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

    async add(data: Partial<AddUserInput>): Promise<UserEntity> {
        let inserted: UserEntity = new UserEntity();
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
    async update(data: Partial<UpdateUserInput>): Promise<UserEntity> {
        let model: UserEntity = this.userModelFactory.create(data as Partial<UserEntity>);
        const query = this.getDbConnection()
            .createQueryBuilder()
            .update('users')
            .set(data as QueryDeepPartialEntity<UpdateUserInput>)
            .where(`"id"=:id`, { id: data.id });
        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (dbResult) {
            model = await this.get({ id: data.id });
        }
        return model;
    }
    async get(data: Partial<UserEntity>): Promise<UserEntity> {
        let model: UserEntity = new UserEntity();
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"firstName"`, 'firstName')
            .addSelect(`"lastName"`, 'lastName')
            .addSelect(`"email"`, 'email')
            .addSelect(`"phone"`, 'phone')
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
            .addSelect(`"phone"`, 'phone')
            .addSelect(`"spaceId"`, 'spaceId')
            .addSelect(`"isActive"`, 'isActive')
            .addSelect(`"createdAt"`, 'createdAt')
            .from('users', 'users')
            .where('1=1');

        if (data?.isActive) {
            query.andWhere('isActive=:isActive', { isActive: data.isActive });
        }
        if (data?.id) {
            query.andWhere('id=:id', { id: data.id });
        }
        if (data?.lastName) {
            query.andWhere('lastName=:lastName', { lastName: data.lastName });
        }
        if (data?.firstName) {
            query.andWhere('firstName=:firstName', { firstName: data.firstName });
        }
        if (data?.email) {
            query.andWhere('email=:email', { email: data.email });
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
