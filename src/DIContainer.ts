import { SpaceService } from './services/SpaceService';
import { SpaceFactory } from './models/space/SpaceFactory';
import { SpaceRepository } from './repositories/postgres/SpaceRepository';
import { ISpaceRepository } from './interfaces/ISpaceRepository';
import { Container } from 'typedi';
import { UserService } from './services/UserService';
import { UserFactory } from './models/user/UserFactory';
import { UserRepository } from './repositories/postgres/UserRepository';
import { IUserRepository } from './interfaces/IUserRepository';

export async function init(): Promise<void> {
    // User
    const userRepository: IUserRepository = new UserRepository(new UserFactory());
    const userService: IUserRepository = new UserService(userRepository);
    Container.set('UserService', userService);

    // Space:
    const spaceRepository: ISpaceRepository = new SpaceRepository(new SpaceFactory());
    const spaceService: ISpaceRepository = new SpaceService(spaceRepository);
    Container.set('SpaceService', spaceService);
}
