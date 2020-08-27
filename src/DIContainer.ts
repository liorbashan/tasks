import { SpaceService } from './services/SpaceService';
import { SpaceModelFactory } from './models/space/SpaceModelFactory';
import { SpaceRepository } from './repositories/postgres/SpaceRepository';
import { ISpaceRepository } from './interfaces/ISpaceRepository';
import { Container } from 'typedi';
import { UserService } from './services/UserService';
import { UserModelFactory } from './models/user/UserModelFactory';
import { UserRepository } from './repositories/postgres/UserRepository';
import { IUserRepository } from './interfaces/IUserRepository';

export async function init(): Promise<void> {
    // User
    const userRepository: IUserRepository = new UserRepository(new UserModelFactory());
    const userService: IUserRepository = new UserService(userRepository);
    Container.set('UserService', userService);

    // Space:
    const spaceRepository: ISpaceRepository = new SpaceRepository(new SpaceModelFactory());
    const spaceService: ISpaceRepository = new SpaceService(spaceRepository);
    Container.set('SpaceService', spaceService);
}
