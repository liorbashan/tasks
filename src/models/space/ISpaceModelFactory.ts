import { SpaceModel } from './SpaceModel';

export interface ISpaceModelFactory {
    create(data: Partial<SpaceModel>): SpaceModel;
}
