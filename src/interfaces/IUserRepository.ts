import { QueryUserInput, UpdateUserInput, AddUserInput } from '../graphql/types/UserGql';
import { User } from '../models/user';

export interface IUserRepository {
    add(data: Partial<AddUserInput>): Promise<User>;
    update(data: Partial<UpdateUserInput>): Promise<User>;
    get(data: Partial<QueryUserInput>): Promise<User>;
    getAll(data?: Partial<QueryUserInput>): Promise<User[]>;
}
