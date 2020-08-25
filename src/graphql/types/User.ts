import { UserModel } from './../../models/user/UserModel';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
    constructor(protected user: UserModel) {}

    getModel(): UserModel {
        return this.user;
    }

    @Field()
    get id(): string {
        return this.user.id;
    }

    @Field()
    get name(): string {
        return this.user.name;
    }

    @Field()
    get email(): string {
        return this.user.email;
    }

    @Field({ nullable: true })
    get groups(): string[] {
        return this.user.groups;
    }

    @Field()
    get isActive(): boolean {
        return this.user.isActive;
    }
}
