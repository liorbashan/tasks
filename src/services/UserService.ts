import { QueryUserInput, UpdateUserInput, AddUserInput } from '../graphql/types/UserGql';
import { UserModel } from './../models/user/UserModel';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Service } from 'typedi';

@Service('RepositoryService')
export class UserService implements IUserRepository {
    constructor(private userRepository: IUserRepository) {}

    async add(data: Partial<AddUserInput>): Promise<UserModel> {
        const result: UserModel = await this.userRepository.add(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(data: Partial<UpdateUserInput>): Promise<UserModel> {
        const result: UserModel = await this.userRepository.update(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async get(data: Partial<QueryUserInput>): Promise<UserModel> {
        const result: UserModel = await this.userRepository.get(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(data?: Partial<QueryUserInput>): Promise<UserModel[]> {
        const result: UserModel[] = await this.userRepository.getAll(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
