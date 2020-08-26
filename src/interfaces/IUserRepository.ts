import { QueryUserInput, UpdateUserInput, AddUserInput } from './../graphql/types/User';
import { UserModel } from '../models/user';

export interface IUserRepository {
    add(data: Partial<AddUserInput>): Promise<UserModel>;
    update(data: Partial<UpdateUserInput>): Promise<UserModel>;
    get(data: Partial<QueryUserInput>): Promise<UserModel>;
    getAll(data?: Partial<QueryUserInput>): Promise<UserModel[]>;
}
