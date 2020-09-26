import { IUserRepository } from './../../interfaces/IUserRepository';
import { UserEntity } from './../../models/user/UserEntity';
import { User } from './../types/User';
import { isAuth } from './../auth/auth';
import { DeleteResult } from './../types/DeleteResult';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { Task, TaskInput } from '../types/Task';
import { Resolver, Query, Ctx, Arg, Mutation, UseMiddleware, FieldResolver, Root } from 'type-graphql';
import { TaskEntity } from '../../models/task';

@Resolver((of) => Task)
export class TaskResolver {
    constructor(private taskService: ITaskRepository, private userService: IUserRepository) {
        if (!taskService) {
            this.taskService = Container.get('TaskService');
        }
        if (!userService) {
            this.userService = Container.get('UserService');
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
        const task: TaskEntity | null = await this.taskService.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return task ? new Task(task) : null;
    }

    @Mutation((returns) => Task, { nullable: true })
    @UseMiddleware(isAuth)
    async AddTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<Task | null> {
        const task: TaskEntity | null = await this.taskService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new Task(task) : null;
    }

    @Mutation((returns) => Task, { nullable: true })
    @UseMiddleware(isAuth)
    async UpdateTask(@Ctx() ctx: Context, @Arg('TaskInput', (type) => TaskInput) input: TaskInput): Promise<Task | null> {
        const task: TaskEntity | null = await this.taskService.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return task ? new Task(task) : null;
    }

    @Mutation((returns) => DeleteResult, { nullable: true })
    @UseMiddleware(isAuth)
    async DeleteTask(@Ctx() ctx: Context, @Arg('ID', (type) => String!) id: string): Promise<DeleteResult> {
        const result = await this.taskService.delete(id).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return new DeleteResult(result);
    }

    @FieldResolver((type) => [User], { nullable: true })
    async User(@Root() task: Task): Promise<User | null> {
        let user: User | null = null;
        const userEntity: UserEntity | null = await this.userService.get({ id: task.get().userId }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (userEntity) {
            user = new User(userEntity);
        }
        return user;
    }
}
