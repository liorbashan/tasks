import { TaskInput } from '../graphql/types/Task';
import { ITaskRepository } from './../interfaces/ITaskRepository';
import { TaskEntity } from '../models/task';
import { BadRequestError } from 'routing-controllers';

export class TaskService implements ITaskRepository {
    constructor(protected taskRepo: ITaskRepository) {}

    async get(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        const result: TaskEntity | null = await this.taskRepo.get(input).catch((error) => {
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
    async add(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        const result: TaskEntity | null = await this.taskRepo.add(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async update(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        const task: TaskEntity | null = await this.get(input).catch((error) => {
            throw new Error(error);
        });
        if (task?.completed) {
            throw new BadRequestError('Completed tasks cannot be updated');
        }
        const result: TaskEntity | null = await this.taskRepo.update(input).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
    async delete(id: string): Promise<number> {
        const result: number = await this.taskRepo.delete(id).catch((error) => {
            throw new Error(error);
        });
        return result;
    }
}
