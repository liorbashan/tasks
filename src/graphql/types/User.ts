import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    isActive: boolean;
}
