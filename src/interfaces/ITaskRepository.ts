import { TaskInput } from './../graphql/types/TaskGql';
import { Task } from '../models/task';
export interface ITaskRepository {
    get(input: Partial<TaskInput>): Promise<Task>;
    getAll(input?: Partial<TaskInput>): Promise<Task[]>;
    add(input: Partial<TaskInput>): Promise<Task>;
    update(input: Partial<TaskInput>): Promise<Task>;
}
