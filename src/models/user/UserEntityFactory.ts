import { UserEntity } from './UserEntity';
import { IUserEntityFactory } from './IUserEntityFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';

@Service('UserModelFactory')
export class UserEntityFactory implements IUserEntityFactory {
    create(data: Partial<UserEntity>): UserEntity {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }
        if (data.isActive === null || data.isActive === undefined) {
            data.isActive = true;
        }
        if (!data.createdAt) {
            data.createdAt = new Date().toISOString();
        }

        const model: UserEntity = new UserEntity();
        Object.assign(model, data);
        return model;
    }
}
