import { UserModel } from '../models/user';

export interface IUserRepository {
    add(data: Partial<UserModel>): Promise<UserModel>;
    update(data: Partial<UserModel>): Promise<UserModel>;
    get(data: Partial<UserModel>): Promise<UserModel>;
    getAll(data: Partial<UserModel>): Promise<UserModel>;
}
