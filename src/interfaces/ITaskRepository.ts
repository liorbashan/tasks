import { TaskInput } from '../graphql/types/Task';
import { TaskEntity } from '../models/task';
export interface ITaskRepository {
    get(input: Partial<TaskInput>): Promise<TaskEntity | null>;
    getAll(input?: Partial<TaskInput>): Promise<TaskEntity[]>;
    add(input: Partial<TaskInput>): Promise<TaskEntity | null>;
    update(input: Partial<TaskInput>): Promise<TaskEntity | null>;
    delete(id: string): Promise<number>;
}
