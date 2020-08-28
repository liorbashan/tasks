import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { TaskGql, TaskInput } from './../types/TaskGql';
import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { Task } from '../../models/task';

@Resolver((of) => TaskGql)
export class TaskResolver {
    constructor(private taskService: ITaskRepository) {
        if (!taskService) {
            this.taskService = Container.get('TaskService');
        }
    }

    @Query((returns) => [TaskGql], { nullable: true })
    async QueryTasks(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput, { nullable: true }) input: TaskInput): Promise<TaskGql[]> {
        const tasks: TaskGql[] = [];
        const models: Task[] = await this.taskService.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                tasks.push(new TaskGql(item));
            }
        }
        return tasks;
    }

    @Query((returns) => TaskGql, { nullable: true })
    async GetTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<TaskGql | null> {
        const task: Task = await this.taskService.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return task ? new TaskGql(task) : null;
    }

    @Mutation((returns) => TaskGql, { nullable: true })
    async AddTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<TaskGql | null> {
        const task: Task = await this.taskService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new TaskGql(task) : null;
    }

    @Mutation((returns) => TaskGql, { nullable: true })
    async UpdateTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<TaskGql | null> {
        const task: Task = await this.taskService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new TaskGql(task) : null;
    }
}
