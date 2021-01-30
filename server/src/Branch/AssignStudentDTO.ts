import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class AssignStudentDTO {
  @Field(() => ID)
  readonly studentId: string;

  @Field(() => ID)
  readonly branchId: string;
}
