import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class College {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;

  @Field(() => ID)
  @Property({ required: true })
  createdBy: ObjectId;
}
