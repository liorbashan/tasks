import { QueryUserInput, UpdateUserInput, AddUserInput } from '../graphql/types/User';
import { UserEntity } from '../models/user';

export interface IUserRepository {
    add(data: Partial<AddUserInput>): Promise<UserEntity | null>;
    update(data: Partial<UpdateUserInput>): Promise<UserEntity | null>;
    get(data: Partial<QueryUserInput>): Promise<UserEntity | null>;
    getAll(data?: Partial<QueryUserInput>): Promise<UserEntity[]>;
}
