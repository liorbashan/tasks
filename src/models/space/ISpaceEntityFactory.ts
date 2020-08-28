import { SpaceEntity } from './SpaceEntity';

export interface ISpaceEntityFactory {
    create(data: Partial<SpaceEntity>): SpaceEntity;
}
