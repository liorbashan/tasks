import { ObjectType, Field, Float } from 'type-graphql';

@ObjectType()
export class DeleteResult {
    @Field((type) => Float, { nullable: true })
    public affected: number;

    constructor(protected affectedRecords: number) {
        this.affected = affectedRecords;
    }
}
