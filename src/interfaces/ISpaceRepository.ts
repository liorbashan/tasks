import { SpaceInput } from '../graphql/types/SpaceGql';
import { Space } from '../models/space';

export interface ISpaceRepository {
    get(input: SpaceInput): Promise<Space>;
    getAll(input?: SpaceInput): Promise<Space[]>;
    add(input: SpaceInput): Promise<Space>;
    update(input: SpaceInput): Promise<Space>;
}
