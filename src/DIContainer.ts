import { Container } from 'typedi';
import { UserService } from './services/UserService';
import { UserModelFactory } from './models/user/UserModelFactory';
import { UserRepository } from './repositories/postgres/UserRepository';
import { IUserRepository } from './interfaces/IUserRepository';

export async function init(): Promise<void> {
    const userRepository: IUserRepository = new UserRepository(new UserModelFactory());
    const userService: IUserRepository = new UserService(userRepository);
    Container.set('UserService', userService);
}
