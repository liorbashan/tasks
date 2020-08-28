import { UserEntity } from './UserEntity';

export interface IUserEntityFactory {
    create(data?: Partial<UserEntity>): UserEntity;
}
