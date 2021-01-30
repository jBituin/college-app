import { prop as Property } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from '../User/UserSchema';
import { Ref } from '../types';

@ObjectType()
export class College {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  createdBy: Ref<User>;
}
