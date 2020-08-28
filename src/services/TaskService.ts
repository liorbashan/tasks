import { TaskInput } from '../graphql/types/Task';
import { ITaskRepository } from './../interfaces/ITaskRepository';
import { TaskEntity } from '../models/task';

export class TaskService implements ITaskRepository {
    constructor(protected taskRepo: ITaskRepository) {}

    async get(input: Partial<TaskInput>): Promise<TaskEntity> {
        const result: TaskEntity = await this.taskRepo.get(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async getAll(input?: Partial<TaskInput> | undefined): Promise<TaskEntity[]> {
        const result: TaskEntity[] = await this.taskRepo.getAll(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async add(input: Partial<TaskInput>): Promise<TaskEntity> {
        const result: TaskEntity = await this.taskRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: Partial<TaskInput>): Promise<TaskEntity> {
        const result: TaskEntity = await this.taskRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
