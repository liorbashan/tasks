import { QueryUserInput } from './../graphql/types/User';
import { UserModel } from './../models/user/UserModel';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Service } from 'typedi';

@Service('RepositoryService')
export class UserService implements IUserRepository {
    constructor(private userRepository: IUserRepository) {}

    async add(data: Partial<UserModel>): Promise<UserModel> {
        const result: UserModel = await this.userRepository.add(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    update(data: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    get(data: Partial<QueryUserInput>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    async getAll(data?: Partial<QueryUserInput>): Promise<UserModel[]> {
        const result: UserModel[] = await this.userRepository.getAll(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
