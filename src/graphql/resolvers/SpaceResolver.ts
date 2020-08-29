import { TaskEntity } from '../../models/task/TaskEntity';
import { Task } from '../types/Task';
import { ShoppingListEntity } from '../../models/shoppingList/ShoppingListEntity';
import { ShoppingList } from '../types/ShoppingList';
import { ITaskRepository } from './../../interfaces/ITaskRepository';
import { logger } from './../../utils/Logger';
import { Context } from './../../models/Context';
import { Container } from 'typedi';
import { ISpaceRepository } from './../../interfaces/ISpaceRepository';
import { Space, SpaceInput } from '../types/Space';
import { Resolver, Query, Ctx, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { SpaceEntity } from '../../models/Space';
import { IShoppingListRepository } from '../../interfaces/IShoppingListRepository';

@Resolver((of) => Space)
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

    @Query((returns) => [Space], { nullable: true })
    async QuerySpaces(@Ctx() ctx: Context, @Arg('SpaceInput', (type) => SpaceInput, { nullable: true }) input: SpaceInput): Promise<Space[]> {
        const spaces: Space[] = [];
        const models: SpaceEntity[] = await this.service.getAll(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (models) {
            for (const item of models) {
                spaces.push(new Space(item));
            }
        }
        return spaces;
    }

    @Query((returns) => Space, { nullable: true })
    async GetSpace(@Ctx() ctx: Context, @Arg('SpaceInput', (type) => SpaceInput) input: SpaceInput): Promise<Space | null> {
        const space: SpaceEntity | null = await this.service.get(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });

        return space ? new Space(space) : null;
    }

    @Mutation((returns) => Space, { nullable: true })
    async AddSpace(@Ctx() ctx: Context, @Arg('SpaceInput', (type) => SpaceInput) input: SpaceInput): Promise<Space | null> {
        const space: SpaceEntity | null = await this.service.add(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return space ? new Space(space) : null;
    }

    @Mutation((returns) => Space, { nullable: true })
    async UpdateSpace(@Ctx() ctx: Context, @Arg('SpaceInput', (type) => SpaceInput) input: SpaceInput): Promise<Space | null> {
        const space: SpaceEntity | null = await this.service.update(input).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        return space ? new Space(space) : null;
    }

    @FieldResolver((type) => [ShoppingList], { nullable: true })
    async shoppingLists(@Root() space: Space): Promise<ShoppingList[]> {
        const shoppingLists: ShoppingList[] = [];
        const items: ShoppingListEntity[] = await this.shoppingListService.getAll({ spaceId: space.get().id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                shoppingLists.push(new ShoppingList(item));
            }
        }
        return shoppingLists;
    }

    @FieldResolver((type) => [Task], { nullable: true })
    async Tasks(@Root() space: Space): Promise<Task[]> {
        const tasks: Task[] = [];
        const items: TaskEntity[] = await this.taskService.getAll({ spaceId: space.get().id }).catch((error) => {
            logger.error(error);
            throw new Error(error);
        });
        if (items) {
            for (const item of items) {
                tasks.push(new Task(item));
            }
        }
        return tasks;
    }
}
