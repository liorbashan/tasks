import { QueryUserInput, UpdateUserInput, AddUserInput } from '../graphql/types/User';
import { UserEntity } from '../models/user/UserEntity';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Service } from 'typedi';

@Service('RepositoryService')
export class UserService implements IUserRepository {
    constructor(private userRepository: IUserRepository) {}

    async add(data: Partial<AddUserInput>): Promise<UserEntity | null> {
        const result: UserEntity | null = await this.userRepository.add(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(data: Partial<UpdateUserInput>): Promise<UserEntity | null> {
        const result: UserEntity | null = await this.userRepository.update(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async get(data: Partial<QueryUserInput>): Promise<UserEntity | null> {
        const result: UserEntity | null = await this.userRepository.get(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(data?: Partial<QueryUserInput>): Promise<UserEntity[]> {
        const result: UserEntity[] = await this.userRepository.getAll(data).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
