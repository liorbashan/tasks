import { TaskEntity } from '../../models/task/TaskEntity';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class Task {
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
    @Field({ nullable: true })
    public category?: string;
    @Field()
    public userId: string;

    constructor(protected task: TaskEntity) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.spaceId = task.spaceId;
        this.completed = task.completed;
        this.completedAt = task.completedAt;
        this.dueDate = task.dueDate;
        this.userId = task.userId;
        this.category = task.category;
    }

    get(): TaskEntity {
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
    @Field({ nullable: true })
    public category?: string;
}
