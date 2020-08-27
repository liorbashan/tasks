import { Space } from '../models/space/Space';
import { ISpaceRepository } from '../interfaces/ISpaceRepository';
import { SpaceInput } from '../graphql/types/SpaceGql';

export class SpaceService implements ISpaceRepository {
    constructor(private spaceRepo: ISpaceRepository) {}

    async get(input: SpaceInput): Promise<Space> {
        const result: Space = await this.spaceRepo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input?: SpaceInput): Promise<Space[]> {
        const result: Space[] = await this.spaceRepo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: SpaceInput): Promise<Space> {
        const result: Space = await this.spaceRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: SpaceInput): Promise<Space> {
        const result: Space = await this.spaceRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
