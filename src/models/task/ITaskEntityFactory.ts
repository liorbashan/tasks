import { TaskEntity } from './TaskEntity';

export interface ITaskEntityFactory {
    create(data: Partial<TaskEntity>): TaskEntity;
}
