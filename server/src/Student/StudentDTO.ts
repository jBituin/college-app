import { InputType, Field } from 'type-graphql';

import { StudentSchema } from './StudentSchema';

@InputType()
export class StudentDTO implements Partial<StudentSchema> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
