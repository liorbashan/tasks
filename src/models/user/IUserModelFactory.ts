import { UserModel } from './UserModel';

export interface IUserModelFactory {
    create(data?: Partial<UserModel>): UserModel;
}
