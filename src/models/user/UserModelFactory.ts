import { Common } from './../../utils/Common';
import { UserModel } from './UserModel';
import { IUserModelFactory } from './IUserModelFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';

@Service('UserModelFactory')
export class UserModelFactory implements IUserModelFactory {
    create(data: Partial<UserModel>): UserModel {
        if (!data.id) {
            data.id = uuidv4().toLocaleUpperCase();
        }
        if (data.isActive === null || data.isActive === undefined) {
            data.isActive = true;
        }
        if (data.groups && !Array.isArray(data.groups)) {
            data.groups = Common.parseCommaDelimitedToArray(data.groups);
        }
        if (!data.createdAt) {
            data.createdAt = new Date().toISOString();
        }

        const model: UserModel = new UserModel();
        Object.assign(model, data);
        return model;
    }
}
