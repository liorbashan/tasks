import { UserModel } from './../models/user/UserModel';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Service } from 'typedi';

@Service('RepositoryService')
export class UserService implements IUserRepository {
    add(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
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
}
