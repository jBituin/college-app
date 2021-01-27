import { InputType, Field } from 'type-graphql';

import { College } from './CollegeSchema';

@InputType()
export class CollegeDTO implements Partial<College> {
  @Field()
  name: string;
}
