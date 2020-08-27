import { User } from './User';
import { IUserFactory } from './IUserFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';

@Service('UserModelFactory')
export class UserFactory implements IUserFactory {
    create(data: Partial<User>): User {
        if (!data.id) {
            data.id = uuidv4().toLocaleUpperCase();
        }
        if (data.isActive === null || data.isActive === undefined) {
            data.isActive = true;
        }
        if (!data.createdAt) {
            data.createdAt = new Date().toISOString();
        }

        const model: User = new User();
        Object.assign(model, data);
        return model;
    }
}
