import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Branch {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property({ required: true })
  name: string;
}