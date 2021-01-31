import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  username: string;

  @Property({ required: true })
  password: string;

  @Field()
  @Property({ required: true })
  tokenVersion: number;
}
