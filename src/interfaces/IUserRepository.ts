import { QueryUserInput } from './../graphql/types/User';
import { UserModel } from '../models/user';

export interface IUserRepository {
    add(data: Partial<UserModel>): Promise<UserModel>;
    update(data: Partial<UserModel>): Promise<UserModel>;
    get(data: Partial<QueryUserInput>): Promise<UserModel>;
    getAll(data?: Partial<QueryUserInput>): Promise<UserModel[]>;
}
