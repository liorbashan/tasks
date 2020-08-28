import { Task } from './../../models/task/Task';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class TaskGql {
    @Field()
    public id: string;
    @Field()
    public title: string;
    @Field({ nullable: true })
    public description?: string;
    @Field()
    public spaceId: string;
    @Field()
    public completed: boolean;
    @Field({ nullable: true })
    public completedAt?: string;
    @Field({ nullable: true })
    public dueDate?: string;
    @Field()
    public userId: string;

    constructor(protected task: Task) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.spaceId = task.spaceId;
        this.completed = task.completed;
        this.completedAt = task.completedAt;
        this.dueDate = task.dueDate;
        this.userId = task.userId;
    }

    get(): Task {
        return this;
    }
}

@InputType()
export class TaskInput {
    @Field({ nullable: true })
    public id?: string;
    @Field({ nullable: true })
    public title?: string;
    @Field({ nullable: true })
    public description?: string;
    @Field({ nullable: true })
    public spaceId?: string;
    @Field({ nullable: true })
    public completed?: boolean;
    @Field({ nullable: true })
    public completedAt?: string;
    @Field({ nullable: true })
    public dueDate?: string;
    @Field({ nullable: true })
    public userId?: string;
}
