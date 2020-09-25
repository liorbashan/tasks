import { isAuth } from './../auth/auth';
import { Container } from 'typedi';
import { logger } from './../../utils/Logger';
import { UserEntity } from '../../models/user/UserEntity';
import { Context } from './../../models/Context';
import { UserService } from './../../services/UserService';
import { User, AddUserInput, QueryUserInput, UpdateUserInput } from '../types/User';
import { Resolver, Mutation, Arg, Query, Ctx, UseMiddleware } from 'type-graphql';

@Resolver((of) => User)
export class UserResolver {
    constructor(private userService: UserService) {
        if (!userService) {
            this.userService = Container.get('UserService');
        }
    }

    @Query((returns) => User, { nullable: true })
    async GetUser(@Ctx() ctx: Context, @Arg('QueryUserInput', { nullable: true }) input: QueryUserInput): Promise<User | null> {
        const model: UserEntity | null = await this.userService.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return model ? new User(model) : null;
    }

    @Query((returns) => [User], { nullable: true })
    async QueryUsers(@Ctx() ctx: Context, @Arg('QueryUserInput', { nullable: true }) input: QueryUserInput): Promise<User[]> {
        const users: User[] = [];
        const models: UserEntity[] = await this.userService.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                users.push(new User(item));
            }
        }
        return users;
    }

    @Mutation((returns) => User, { nullable: true })
    @UseMiddleware(isAuth)
    async AddUser(@Ctx() ctx: Context, @Arg('AddUserInput') input: AddUserInput): Promise<User | null> {
        const userRole = ctx.payload.role;
        if (userRole !== 'admin') {
            throw new Error('Not Authorized');
        }
        const userModel: UserEntity | null = await this.userService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return userModel ? new User(userModel) : null;
    }

    @Mutation((returns) => User, { nullable: true })
    @UseMiddleware(isAuth)
    async UpdateUser(@Ctx() ctx: Context, @Arg('UpdateUserInput') input: UpdateUserInput): Promise<User | null> {
        const userRole = ctx.payload.role;
        if (userRole !== 'admin') {
            throw new Error('Not Authorized');
        }
        const userModel: UserEntity | null = await this.userService.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return userModel ? new User(userModel) : null;
    }
}
