import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';
@ObjectType()
export class Student {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  firstName: string;

  @Field()
  @Property({ required: true })
  lastName: string;

  @Field(() => ID)
  @Property({ required: true })
  collegeId: ObjectId;
}
