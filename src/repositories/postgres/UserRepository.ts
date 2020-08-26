import { QueryUserInput } from './../../graphql/types/User';
import { logger } from './../../utils/Logger';
import { UserModelFactory } from './../../models/user/UserModelFactory';
import { UserModel } from './../../models/user/UserModel';
import { IUserRepository } from './../../interfaces/IUserRepository';
import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';

@Service('UserRepository')
export class UserRepository implements IUserRepository {
    constructor(private userModelFactory: UserModelFactory, protected dbConnection?: Connection) {}

    async add(data: Partial<UserModel>): Promise<UserModel> {
        let inserted: UserModel = new UserModel();
        const user: UserModel = this.userModelFactory.create(data);
        const query = this.getDbConnection().createQueryBuilder().insert().into('users').values([user]).returning('INSERTED.*');

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = this.userModelFactory.create(dbResult.raw[0]);
        }
        return inserted;
    }
    update(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    get(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    async getAll(data?: Partial<QueryUserInput>): Promise<UserModel[]> {
        const models: UserModel[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select('id', 'id')
            .addSelect('firstName', 'firstName')
            .addSelect('lastName', 'lastName')
            .addSelect('email', 'email')
            .addSelect('phone', 'phone')
            .addSelect('groups', 'groups')
            .addSelect('isActive', 'isActive')
            .addSelect('createdAt', 'createdAt')
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
