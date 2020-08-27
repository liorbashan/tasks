import { UserModel } from './../../models/user/UserModel';
import { ObjectType, Field, InputType } from 'type-graphql';

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
    get firstName(): string {
        return this.user.firstName;
    }

    @Field()
    get lastName(): string {
        return this.user.lastName;
    }

    @Field()
    get email(): string {
        return this.user.email;
    }

    @Field()
    get phone(): string {
        return this.user.phone;
    }

    @Field((type) => String, { nullable: true })
    get spaceId(): string {
        return this.user.spaceId ? this.user.spaceId : 'undefined';
    }

    @Field()
    get isActive(): boolean {
        return this.user.isActive;
    }

    @Field()
    get createdAt(): string {
        return this.user.createdAt;
    }
}

@InputType()
export class AddUserInput {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field({ nullable: true })
    phone?: string;
    @Field({ nullable: true })
    spaceId?: string;
}

@InputType()
export class UpdateUserInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    firstName?: string;
    @Field({ nullable: true })
    lastName?: string;
    @Field({ nullable: true })
    email?: string;
    @Field({ nullable: true })
    phone?: string;
    @Field({ nullable: true })
    spaceId?: string;
    @Field({ nullable: true })
    isActive: boolean;
}

@InputType()
export class QueryUserInput {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    isActive?: boolean;
}
