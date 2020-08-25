import { UserModelFactory } from './../../models/user/UserModelFactory';
import { UserModel } from './../../models/user/UserModel';
import { IUserRepository } from './../../interfaces/IUserRepository';
import { Service } from 'typedi';
import { Connection, getConnection } from 'typeorm';

@Service('UserRepository')
export class UserRepository implements IUserRepository {
    constructor(private userModelFactory: UserModelFactory, protected dbConnection?: Connection) {}

    add(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
        // const user: UserModel = this.userModelFactory.create(data);
        // const query = this.getDbConnection().createQueryBuilder().insert(user);
    }
    update(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    get(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    getAll(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    private getDbConnection() {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
