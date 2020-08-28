import { Task } from './../../models/task/Task';
import { TaskGql } from './../types/TaskGql';
import { ShoppingList } from './../../models/shoppingList/ShoppingList';
import { ShoppingListGql } from './../types/ShoppingListGql';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { ISpaceRepository } from './../../interfaces/ISpaceRepository';
import { SpaceGql, SpaceInput } from './../types/SpaceGql';
import { Resolver, Query, Ctx, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { Space } from '../../models/Space';
import { IShoppingListRepository } from '../../interfaces/IShoppingListRepository';

@Resolver((of) => SpaceGql)
export class SpaceResolver {
    constructor(private service: ISpaceRepository, private taskService: ITaskRepository, private shoppingListService: IShoppingListRepository) {
        if (!service) {
            this.service = Container.get('SpaceService');
        }
        if (!taskService) {
            this.taskService = Container.get('TaskService');
        }
        if (!shoppingListService) {
            this.shoppingListService = Container.get('ShoppingListService');
        }
    }

    @Query((returns) => [SpaceGql], { nullable: true })
    async QuerySpaces(@Ctx() ctx: Context, @Arg('SpaceInput', { nullable: true }) input: SpaceInput): Promise<SpaceGql[]> {
        const spaces: SpaceGql[] = [];
        const models: Space[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                spaces.push(new SpaceGql(item));
            }
        }
        return spaces;
    }

    @Query((returns) => SpaceGql, { nullable: true })
    async GetSpace(@Ctx() ctx: Context, @Arg('SpaceInput') input: SpaceInput): Promise<SpaceGql | null> {
        const space: Space = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return space ? new SpaceGql(space) : null;
    }

    @Mutation((returns) => SpaceGql, { nullable: true })
    async AddSpace(@Ctx() ctx: Context, @Arg('SpaceInput') input: SpaceInput): Promise<SpaceGql | null> {
        const space: Space = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return space ? new SpaceGql(space) : null;
    }

    @Mutation((returns) => SpaceGql, { nullable: true })
    async UpdateSpace(@Ctx() ctx: Context, @Arg('SpaceInput') input: SpaceInput): Promise<SpaceGql | null> {
        const space: Space = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return space ? new SpaceGql(space) : null;
    }

    @FieldResolver({ nullable: true })
    async shoppingLists(@Root() space: SpaceGql): Promise<ShoppingListGql[]> {
        const shoppingLists: ShoppingListGql[] = [];
        const items: ShoppingList[] = await this.shoppingListService.getAll({ spaceId: space.id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                shoppingLists.push(new ShoppingListGql(item));
            }
        }
        return shoppingLists;
    }

    @FieldResolver({ nullable: true })
    async Tasks(@Root() space: SpaceGql): Promise<TaskGql[]> {
        const tasks: TaskGql[] = [];
        const items: Task[] = await this.taskService.getAll({ spaceId: space.id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                tasks.push(new TaskGql(item));
            }
        }
        return tasks;
    }
}
