import { ShoppingListEntity } from '../../models/shoppingList/ShoppingListEntity';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class ShoppingList {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field({ nullable: true })
    public description?: string;
    @Field()
    public spaceId: string;
    constructor(protected shoppingList: ShoppingListEntity) {
        this.id = shoppingList.id;
        this.title = shoppingList.title;
        this.description = shoppingList.description;
        this.spaceId = shoppingList.spaceId;
    }

    get(): ShoppingListEntity {
        return this;
    }
}

@InputType()
export class ShoppingListInput {
    @Field({ nullable: true })
    public id?: string;
    @Field({ nullable: true })
    public title?: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public spaceId?: string;
}
