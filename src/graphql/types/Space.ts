import { SpaceModel } from './../../models/space/SpaceModel';
import { ObjectType, Field, InputType } from 'type-graphql';

ObjectType();
export class Space {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field()
    public description: string;
    @Field({ nullable: true })
    public imageUrl?: string;

    constructor(protected space: SpaceModel) {
        this.id = space.id;
        this.title = space.title;
        this.description = space.description;
        this.imageUrl = space.imageUrl;
    }
    get(): Space {
        return this;
    }
}

InputType();
export class SpaceInput {
    @Field({ nullable: true })
    public id?: string;
    @Field({ nullable: true })
    public title?: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public imageUrl?: string;
}
