import { ITaskFactory } from './ITaskFactory';
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

export class TaskFactory implements ITaskFactory {
    create(data: Partial<Task>): Task {
        if (!data.id) {
            data.id = uuidv4().toLocalLowerCase();
        }
        const task: Task = new Task();
        Object.assign(task, data);
        return task;
    }
}
