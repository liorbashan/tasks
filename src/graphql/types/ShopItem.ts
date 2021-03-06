import { ShopItemEntity } from '../../models/shopItem/ShopItemEntity';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class ShopItem {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field()
    public active: boolean;
    @Field({ nullable: true })
    public imageUrl?: string;
    @Field()
    public shoppingListId: string;

    constructor(protected shopItem: ShopItemEntity) {
        this.id = shopItem.id;
        this.title = shopItem.title;
        this.active = shopItem.active;
        this.imageUrl = shopItem.imageUrl;
        this.shoppingListId = shopItem.shoppingListId;
    }

    get(): ShopItemEntity {
        return this;
    }
}

@InputType()
export class ShopItemInput {
    @Field({ nullable: true })
    public id?: string;
    @Field({ nullable: true })
    public title?: string;
    @Field({ nullable: true })
    public active?: boolean;
    @Field({ nullable: true })
    public imageUrl?: string;
    @Field({ nullable: true })
    public shoppingListId?: string;
}
