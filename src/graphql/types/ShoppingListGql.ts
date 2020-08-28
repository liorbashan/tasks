import { ShoppingList } from './../../models/shoppingList/ShoppingList';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class ShoppingListGql {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field({ nullable: true })
    public description?: string;
    @Field()
    public spaceId: string;
    constructor(protected shoppingList: ShoppingList) {
        this.id = shoppingList.id;
        this.title = shoppingList.title;
        this.description = shoppingList.description;
        this.spaceId = shoppingList.spaceId;
    }

    get(): ShoppingList {
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
