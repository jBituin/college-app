import { InputType, Field } from 'type-graphql';

import { Branch } from './BranchSchema';

@InputType()
export class BranchDTO implements Partial<Branch> {
  @Field()
  name: string;
}
