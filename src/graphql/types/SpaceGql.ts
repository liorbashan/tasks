import { Space } from '../../models/space/Space';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class SpaceGql {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field()
    public description: string;
    @Field({ nullable: true })
    public imageUrl?: string;

    constructor(protected space: Space) {
        this.id = space.id;
        this.title = space.title;
        this.description = space.description;
        this.imageUrl = space.imageUrl;
    }
    get(): SpaceGql {
        return this;
    }
}

@InputType()
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
