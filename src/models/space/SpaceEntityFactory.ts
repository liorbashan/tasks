import { ISpaceEntityFactory } from './ISpaceEntityFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';
import { SpaceEntity } from './SpaceEntity';

@Service('SpaceModelFactory')
export class SpaceEntityFactory implements ISpaceEntityFactory {
    create(data: Partial<SpaceEntity>): SpaceEntity {
        if (!data.id) {
            data.id = uuidv4().toLocaleLowerCase();
        }

        const model: SpaceEntity = new SpaceEntity();
        Object.assign(model, data);
        return model;
    }
}
