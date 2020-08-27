import { User } from './User';

export interface IUserFactory {
    create(data?: Partial<User>): User;
}
