import { ShoppingListService } from './services/ShoppingListService';
import { ShoppingListFactory } from './models/shoppingList/ShoppingListFactory';
import { ShoppingListRepository } from './repositories/postgres/ShoppingListRepository';
import { IShoppingListRepository } from './interfaces/IShoppingListRepository';
import { ShopItemService } from './services/ShopItemService';
import { ShopItemFactory } from './models/shopItem/ShopItemFactory';
import { ShopItemRepository } from './repositories/postgres/ShopItemRepository';
import { IShopItemRepository } from './interfaces/IShopItemRepository';
import { TaskRepository } from './repositories/postgres/TaskRepository';
import { TaskFactory } from './models/task/TaskFactory';
import { TaskService } from './services/TaskService';
import { ITaskRepository } from './interfaces/ITaskRepository';
import { SpaceService } from './services/SpaceService';
import { SpaceFactory } from './models/space/SpaceFactory';
import { SpaceRepository } from './repositories/postgres/SpaceRepository';
import { ISpaceRepository } from './interfaces/ISpaceRepository';
import { Container } from 'typedi';
import { UserService } from './services/UserService';
import { UserFactory } from './models/user/UserFactory';
import { UserRepository } from './repositories/postgres/UserRepository';
import { IUserRepository } from './interfaces/IUserRepository';

export async function init(): Promise<void> {
    // User:
    const userRepository: IUserRepository = new UserRepository(new UserFactory());
    const userService: IUserRepository = new UserService(userRepository);
    Container.set('UserService', userService);

    // Space:
    const spaceRepository: ISpaceRepository = new SpaceRepository(new SpaceFactory());
    const spaceService: ISpaceRepository = new SpaceService(spaceRepository);
    Container.set('SpaceService', spaceService);

    // Task:
    const taskRepository: ITaskRepository = new TaskRepository(new TaskFactory());
    const taskService: ITaskRepository = new TaskService(taskRepository);
    Container.set('TaskService', taskService);

    // ShopItem:
    const shopItemRepository: IShopItemRepository = new ShopItemRepository(new ShopItemFactory());
    const shopItemService: IShopItemRepository = new ShopItemService(shopItemRepository);
    Container.set('ShopItemService', shopItemService);

    // ShoppingList:
    const shoppingListRepository: IShoppingListRepository = new ShoppingListRepository(new ShoppingListFactory());
    const shoppingListService: IShoppingListRepository = new ShoppingListService(shoppingListRepository);
    Container.set('ShoppingListService', shoppingListService);
}
