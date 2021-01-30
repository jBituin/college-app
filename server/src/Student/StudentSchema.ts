import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { Branch } from '../Branch/BranchSchema';
@ObjectType()
export class Student {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property({ required: true })
  firstName: string;

  @Field()
  @Property({ required: true })
  lastName: string;

  @Field(() => ID)
  @Property({ required: true })
  collegeId: string;

  @Field(() => [Branch])
  @Property({ type: () => Branch, default: [] })
  branches: Branch[];
}
