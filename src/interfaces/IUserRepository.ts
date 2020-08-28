import { QueryUserInput, UpdateUserInput, AddUserInput } from '../graphql/types/User';
import { UserEntity } from '../models/user';

export interface IUserRepository {
    add(data: Partial<AddUserInput>): Promise<UserEntity>;
    update(data: Partial<UpdateUserInput>): Promise<UserEntity>;
    get(data: Partial<QueryUserInput>): Promise<UserEntity>;
    getAll(data?: Partial<QueryUserInput>): Promise<UserEntity[]>;
}
