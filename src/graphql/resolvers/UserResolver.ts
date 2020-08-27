import { Container } from 'typedi';
import { logger } from './../../utils/Logger';
import { User } from '../../models/user/User';
import { Context } from './../../models/Context';
import { UserService } from './../../services/UserService';
import { UserGql, AddUserInput, QueryUserInput, UpdateUserInput } from '../types/UserGql';
import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';

@Resolver((of) => UserGql)
export class UserResolver {
    constructor(private userService: UserService) {
        if (!userService) {
            this.userService = Container.get('UserService');
        }
    }

    @Query((returns) => UserGql, { nullable: true })
    async GetUser(@Ctx() ctx: Context, @Arg('QueryUserInput', { nullable: true }) input: QueryUserInput): Promise<UserGql | null> {
        const model: User = await this.userService.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return model ? new UserGql(model) : null;
    }

    @Query((returns) => [UserGql], { nullable: true })
    async QueryUsers(@Ctx() ctx: Context, @Arg('QueryUserInput', { nullable: true }) input: QueryUserInput): Promise<UserGql[]> {
        const users: UserGql[] = [];
        const models: User[] = await this.userService.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                users.push(new UserGql(item));
            }
        }
        return users;
    }

    @Mutation((returns) => UserGql, { nullable: true })
    async AddUser(@Ctx() ctx: Context, @Arg('AddUserInput') input: AddUserInput): Promise<UserGql | null> {
        const userModel: User = await this.userService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return userModel ? new UserGql(userModel) : null;
    }

    @Mutation((returns) => UserGql, { nullable: true })
    async UpdateUser(@Ctx() ctx: Context, @Arg('UpdateUserInput') input: UpdateUserInput): Promise<UserGql | null> {
        const userModel: User = await this.userService.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return userModel ? new UserGql(userModel) : null;
    }
}
