import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { Connection, getConnection } from 'typeorm';
import { TaskInput } from './../../graphql/types/TaskGql';
import { ITaskFactory } from './../../models/task/ITaskFactory';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { Task } from '../../models/task';

export class TaskRepository implements ITaskRepository {
    constructor(private taskFactory: ITaskFactory, protected dbConnection?: Connection) {}

    async get(input: Partial<TaskInput>): Promise<Task> {
        let model: Task = new Task();
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"spaceId"`, 'spaceId')
            .addSelect(`"completed"`, 'completed')
            .addSelect(`"completedAt"`, 'completedAt')
            .addSelect(`"dueDate"`, 'dueDate')
            .addSelect(`"userId"`, 'userId')
            .from('tasks', 'tasks')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.userId) {
            query.andWhere(`"userId"=:userId`, { userId: input.userId });
        }
        if (input?.spaceId) {
            query.andWhere(`"spaceId"=:spaceId`, { spaceId: input.spaceId });
        }

        const dbResult: any = await query.getRawOne().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            model = this.taskFactory.create(dbResult);
        }
        return model;
    }
    async getAll(input?: Partial<TaskInput> | undefined): Promise<Task[]> {
        const models: Task[] = [];
        const query = this.getDbConnection()
            .createQueryBuilder()
            .select(`"id"`, 'id')
            .addSelect(`"title"`, 'title')
            .addSelect(`"description"`, 'description')
            .addSelect(`"spaceId"`, 'spaceId')
            .addSelect(`"completed"`, 'completed')
            .addSelect(`"completedAt"`, 'completedAt')
            .addSelect(`"dueDate"`, 'dueDate')
            .addSelect(`"userId"`, 'userId')
            .from('tasks', 'tasks')
            .where('1=1');

        if (input?.id) {
            query.andWhere(`"id"=:id`, { id: input.id });
        }
        if (input?.title) {
            query.andWhere(`"title"=:title`, { title: input.title });
        }
        if (input?.userId) {
            query.andWhere(`"userId"=:userId`, { userId: input.userId });
        }
        if (input?.spaceId) {
            query.andWhere(`"spaceId"=:spaceId`, { spaceId: input.spaceId });
        }

        const dbResult: any = await query.getRawMany().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult?.length > 0) {
            for (const item of dbResult) {
                models.push(this.taskFactory.create(item));
            }
        }
        return models;
    }
    async add(input: Partial<TaskInput>): Promise<Task> {
        let inserted: Task = new Task();
        const taskModel: Task = this.taskFactory.create(input as Partial<Task>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('spaces').values([taskModel]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: taskModel.id });
        }
        return inserted;
    }
    async update(input: Partial<TaskInput>): Promise<Task> {
        let model: Task = this.taskFactory.create(input as Partial<Task>);
        const query = this.getDbConnection()
            .createQueryBuilder()
            .update('spaces')
            .set(input as QueryDeepPartialEntity<TaskInput>)
            .where(`"id"=:id`, { id: input.id });
        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (dbResult) {
            model = await this.get({ id: input.id });
        }
        return model;
    }

    private getDbConnection(): Connection {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
