import { UserModel } from './UserModel';
import { IUserModelFactory } from './IUserModelFactory';
import { v4 as uuidv4 } from 'uuid';

export class UserModelFactory implements IUserModelFactory {
    create(data: Partial<UserModel>): UserModel {
        if (!data.id) {
            data.id = uuidv4().toLocaleUpperCase();
        }

        const model: UserModel = new UserModel();
        Object.assign(model, data);
        return model;
    }
}
