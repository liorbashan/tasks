import { ISpaceFactory } from './ISpaceFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';
import { Space } from './Space';

@Service('SpaceModelFactory')
export class SpaceFactory implements ISpaceFactory {
    create(data: Partial<Space>): Space {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }

        const model: Space = new Space();
        Object.assign(model, data);
        return model;
    }
}
