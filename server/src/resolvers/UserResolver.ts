import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
  UseMiddleware,
} from 'type-graphql';
import { ObjectId } from 'mongodb';
import { hash, compare } from 'bcryptjs';
import { User } from '../User/UserSchema';
import { UserModel } from '../User/UserModel';
import { MyContext } from '../MyContext';
import {
  createRefreshToken,
  createAccessToken,
  sendRefreshToken,
  isAuth,
} from '../auth';
import { UserDTO } from 'src/User/UserDTO';
import { ObjectIdScalar } from '../object-id.scalar';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello!';
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async myInfo(@Ctx() { payload }: MyContext) {
    const user = await UserModel.findOne(new ObjectId(payload!.userId));
    return user?.username;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId
  ) {
    await UserModel.update({ _id: userId }, { $inc: { tokenVersion: 1 } });
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('User does not exist');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12);
    const userDetails: UserDTO = {
      username,
      password: hashedPassword,
      tokenVersion: 1,
    };

    try {
      const user = await UserModel.create(userDetails);
      await user.save();
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
