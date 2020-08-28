import { ITaskEntityFactory } from './ITaskEntityFactory';
import { TaskEntity } from './TaskEntity';
import { v4 as uuidv4 } from 'uuid';

export class TaskEntityFactory implements ITaskEntityFactory {
    create(data: Partial<TaskEntity>): TaskEntity {
        if (!data.id) {
            data.id = uuidv4().toLocalLowerCase();
        }
        const task: TaskEntity = new TaskEntity();
        Object.assign(task, data);
        return task;
    }
}
