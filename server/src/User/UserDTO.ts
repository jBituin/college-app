import { InputType, Field } from 'type-graphql';

import { User } from './UserSchema';

@InputType()
export class UserDTO implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  tokenVersion: number;
}
