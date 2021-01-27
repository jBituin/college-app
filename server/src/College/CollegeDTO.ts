import { InputType, Field } from 'type-graphql';

import { CollegeSchema } from './CollegeSchema';

@InputType()
export class CollegeDTO implements Partial<CollegeSchema> {
  @Field()
  name: string;
}
