import { UserEntity } from '../../models/user/UserEntity';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    public id: string;
    @Field()
    public firstName: string;
    @Field()
    public lastName: string;
    @Field()
    public email: string;
    @Field()
    public emailVerified: boolean;
    @Field({ nullable: true })
    public picture?: string;
    @Field({ nullable: true })
    public phone?: string;
    @Field({ nullable: true })
    public role?: string;
    @Field({ nullable: true })
    public spaceId?: string;
    @Field()
    public isActive: boolean;
    @Field()
    public createdAt: string;

    constructor(protected user: UserEntity) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.emailVerified = user.emailVerified;
        this.picture = user.picture;
        this.spaceId = user.spaceId;
        this.phone = user.phone;
        this.role = user.role;
        this.isActive = user.isActive;
        this.createdAt = user.createdAt;
    }

    get(): UserEntity {
        return this;
    }
}

@InputType()
export class AddUserInput {
    @Field({ nullable: true })
    id?: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field()
    emailVerified: boolean;
    @Field({ nullable: true })
    picture?: string;
    @Field({ nullable: true })
    phone?: string;
    @Field({ nullable: true })
    role?: string;
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
    role?: string;
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

    @Field({ nullable: true })
    spaceId?: string;
}
