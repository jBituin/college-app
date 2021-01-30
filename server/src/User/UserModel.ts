import { getModelForClass } from '@typegoose/typegoose';
import { User } from './UserSchema';

export const UserModel = getModelForClass(User);
