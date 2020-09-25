import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { logger } from './../../utils/Logger';
import { Connection, getConnection } from 'typeorm';
import { TaskInput } from '../../graphql/types/Task';
import { ITaskEntityFactory } from '../../models/task/ITaskEntityFactory';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { TaskEntity } from '../../models/task';

export class TaskRepository implements ITaskRepository {
    constructor(private taskFactory: ITaskEntityFactory, protected dbConnection?: Connection) {}

    async get(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        let model: TaskEntity | null = null;
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
    async getAll(input?: Partial<TaskInput> | undefined): Promise<TaskEntity[]> {
        const models: TaskEntity[] = [];
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
    async add(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        let inserted: TaskEntity | null = null;
        const taskModel: TaskEntity = this.taskFactory.create(input as Partial<TaskEntity>);
        const query = this.getDbConnection().createQueryBuilder().insert().into('tasks').values([taskModel]);

        const dbResult: any = await query.execute().catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        if (dbResult) {
            inserted = await this.get({ id: taskModel.id });
        }
        return inserted;
    }
    async update(input: Partial<TaskInput>): Promise<TaskEntity | null> {
        let model: TaskEntity | null = null;
        try {
            const id: string = input.id!;
            delete input.id;
            const query = this.getDbConnection()
                .createQueryBuilder()
                .update('tasks')
                .set(input as QueryDeepPartialEntity<TaskInput>)
                .where(`"id"=:id`, { id });
            const dbResult: any = await query.execute().catch((error) => {
                logger.error(error);
                throw new Error(error);
            });
            if (dbResult) {
                model = await this.get({ id });
            }
            return model;
        } catch (error) {
            throw new Error(`Are you missing property 'id' from the updated object?`);
        }
    }

    async delete(id: string): Promise<number> {
        try {
            const query = this.getDbConnection().createQueryBuilder().delete().from('tasks', 'tasks').where(`"id"=:id`, { id });
            const dbResult: any = await query.execute().catch((error) => {
                logger.error(error);
                throw new Error(error);
            });
            return dbResult?.affected ? dbResult.affected : 0;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    private getDbConnection(): Connection {
        if (!this.dbConnection) {
            return getConnection();
        }
        return this.dbConnection;
    }
}
