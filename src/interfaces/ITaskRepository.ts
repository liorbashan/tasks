import { TaskInput } from '../graphql/types/Task';
import { TaskEntity } from '../models/task';
export interface ITaskRepository {
    get(input: Partial<TaskInput>): Promise<TaskEntity>;
    getAll(input?: Partial<TaskInput>): Promise<TaskEntity[]>;
    add(input: Partial<TaskInput>): Promise<TaskEntity>;
    update(input: Partial<TaskInput>): Promise<TaskEntity>;
}
