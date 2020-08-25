import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    groups: string[];

    @Field()
    isActive: boolean;
}
