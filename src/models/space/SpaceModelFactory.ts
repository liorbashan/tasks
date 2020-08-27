import { ISpaceModelFactory } from './ISpaceModelFactory';
import { v4 as uuidv4 } from 'uuid';
import { Service } from 'typedi';
import { SpaceModel } from './SpaceModel';

@Service('SpaceModelFactory')
export class SpaceModelFactory implements ISpaceModelFactory {
    create(data: Partial<SpaceModel>): SpaceModel {
        if (!data.id) {
            data.id = uuidv4().toLocaleUpperCase();
        }

        const model: SpaceModel = new SpaceModel();
        Object.assign(model, data);
        return model;
    }
}
