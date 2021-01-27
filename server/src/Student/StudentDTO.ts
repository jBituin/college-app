import { InputType, Field } from 'type-graphql';

import { Student } from './StudentSchema';

@InputType()
export class StudentDTO implements Partial<Student> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
