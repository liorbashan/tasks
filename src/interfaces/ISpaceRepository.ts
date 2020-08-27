import { SpaceInput } from './../graphql/types/Space';
import { SpaceModel } from '../models/space';

export interface ISpaceRepository {
    get(input: SpaceInput): Promise<SpaceModel>;
    getAll(input?: SpaceInput): Promise<SpaceModel[]>;
    add(input: SpaceInput): Promise<SpaceModel>;
    update(input: SpaceInput): Promise<SpaceModel>;
}
