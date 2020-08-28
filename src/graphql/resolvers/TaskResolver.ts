import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { Task, TaskInput } from '../types/Task';
import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { TaskEntity } from '../../models/task';

@Resolver((of) => Task)
export class TaskResolver {
    constructor(private taskService: ITaskRepository) {
        if (!taskService) {
            this.taskService = Container.get('TaskService');
        }
    }

    @Query((returns) => [Task], { nullable: true })
    async QueryTasks(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput, { nullable: true }) input: TaskInput): Promise<Task[]> {
        const tasks: Task[] = [];
        const models: TaskEntity[] = await this.taskService.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                tasks.push(new Task(item));
            }
        }
        return tasks;
    }

    @Query((returns) => Task, { nullable: true })
    async GetTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<Task | null> {
        const task: TaskEntity = await this.taskService.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return task ? new Task(task) : null;
    }

    @Mutation((returns) => Task, { nullable: true })
    async AddTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<Task | null> {
        const task: TaskEntity = await this.taskService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new Task(task) : null;
    }

    @Mutation((returns) => Task, { nullable: true })
    async UpdateTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<Task | null> {
        const task: TaskEntity = await this.taskService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new Task(task) : null;
    }
}
