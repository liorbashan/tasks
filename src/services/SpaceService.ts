import { SpaceModel } from './../models/space/SpaceModel';
import { ISpaceRepository } from '../interfaces/ISpaceRepository';
import { SpaceInput } from '../graphql/types/Space';

export class SpaceService implements ISpaceRepository {
    constructor(private spaceRepo: ISpaceRepository) {}

    async get(input: SpaceInput): Promise<SpaceModel> {
        const result: SpaceModel = await this.spaceRepo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input?: SpaceInput): Promise<SpaceModel[]> {
        const result: SpaceModel[] = await this.spaceRepo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: SpaceInput): Promise<SpaceModel> {
        const result: SpaceModel = await this.spaceRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: SpaceInput): Promise<SpaceModel> {
        const result: SpaceModel = await this.spaceRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
