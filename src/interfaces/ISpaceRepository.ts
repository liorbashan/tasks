import { SpaceInput } from '../graphql/types/Space';
import { SpaceEntity } from '../models/space';

export interface ISpaceRepository {
    get(input: SpaceInput): Promise<SpaceEntity>;
    getAll(input?: SpaceInput): Promise<SpaceEntity[]>;
    add(input: SpaceInput): Promise<SpaceEntity>;
    update(input: SpaceInput): Promise<SpaceEntity>;
}
