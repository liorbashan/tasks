import { ShoppingListService } from './services/ShoppingListService';
import { ShoppingListEntityFactory } from './models/shoppingList/ShoppingListEntityFactory';
import { ShoppingListRepository } from './repositories/postgres/ShoppingListRepository';
import { IShoppingListRepository } from './interfaces/IShoppingListRepository';
import { ShopItemService } from './services/ShopItemService';
import { ShopItemEntityFactory } from './models/shopItem/ShopItemEntityFactory';
import { ShopItemRepository } from './repositories/postgres/ShopItemRepository';
import { IShopItemRepository } from './interfaces/IShopItemRepository';
import { TaskRepository } from './repositories/postgres/TaskRepository';
import { TaskEntityFactory } from './models/task/TaskEntityFactory';
import { TaskService } from './services/TaskService';
import { ITaskRepository } from './interfaces/ITaskRepository';
import { SpaceService } from './services/SpaceService';
import { SpaceEntityFactory } from './models/space/SpaceEntityFactory';
import { SpaceRepository } from './repositories/postgres/SpaceRepository';
import { ISpaceRepository } from './interfaces/ISpaceRepository';
import { Container } from 'typedi';
import { UserService } from './services/UserService';
import { UserEntityFactory } from './models/user/UserEntityFactory';
import { UserRepository } from './repositories/postgres/UserRepository';
import { IUserRepository } from './interfaces/IUserRepository';

export async function init(): Promise<void> {
    // User:
    const userRepository: IUserRepository = new UserRepository(new UserEntityFactory());
    const userService: IUserRepository = new UserService(userRepository);
    Container.set('UserService', userService);

    // Space:
    const spaceRepository: ISpaceRepository = new SpaceRepository(new SpaceEntityFactory());
    const spaceService: ISpaceRepository = new SpaceService(spaceRepository);
    Container.set('SpaceService', spaceService);

    // Task:
    const taskRepository: ITaskRepository = new TaskRepository(new TaskEntityFactory());
    const taskService: ITaskRepository = new TaskService(taskRepository);
    Container.set('TaskService', taskService);

    // ShopItem:
    const shopItemRepository: IShopItemRepository = new ShopItemRepository(new ShopItemEntityFactory());
    const shopItemService: IShopItemRepository = new ShopItemService(shopItemRepository);
    Container.set('ShopItemService', shopItemService);

    // ShoppingList:
    const shoppingListRepository: IShoppingListRepository = new ShoppingListRepository(new ShoppingListEntityFactory());
    const shoppingListService: IShoppingListRepository = new ShoppingListService(shoppingListRepository);
    Container.set('ShoppingListService', shoppingListService);
}
