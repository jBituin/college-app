import { prop as Property, index } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
@index({ username: 1 }, { unique: true })
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
