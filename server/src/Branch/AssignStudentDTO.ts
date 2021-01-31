import { InputType, Field, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class AssignStudentDTO {
  @Field(() => ID)
  readonly studentId: ObjectId;

  @Field(() => ID)
  readonly branchId: ObjectId;
}
