import { Container } from 'typedi';
import { logger } from './../../utils/Logger';
import { UserModel } from './../../models/user/UserModel';
import { Context } from './../../models/Context';
import { UserService } from './../../services/UserService';
import { User, AddUserInput, QueryUserInput } from './../types/User';
import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';

@Resolver((of) => User)
export class UserResolver {
    constructor(private userService: UserService) {
        if (!userService) {
            this.userService = Container.get('UserService');
        }
    }

    @Query((returns) => [User], { nullable: true })
    async QueryUsers(@Ctx() ctx: Context, @Arg('QueryUserInput', { nullable: true }) input: QueryUserInput): Promise<User[]> {
        const users: User[] = [];
        const models: UserModel[] = await this.userService.getAll(input).catch((error) => {
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
    async AddUser(@Ctx() ctx: Context, @Arg('AddUserInput') input: AddUserInput): Promise<User | null> {
        const userModel: UserModel = await this.userService.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return userModel ? new User(userModel) : null;
    }
}
