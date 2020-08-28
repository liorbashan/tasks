import { Task } from './Task';

export interface ITaskFactory {
    create(data: Partial<Task>): Task;
}
