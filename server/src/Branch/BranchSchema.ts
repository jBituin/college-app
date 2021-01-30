import { prop as Property, Prop } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import { College } from '../College/CollegeSchema';
import { Ref } from '../types';
@ObjectType()
export class Branch {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field(() => College)
  @Prop({ ref: College, required: true })
  collegeId: Ref<College>;
}
