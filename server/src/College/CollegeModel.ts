import { getModelForClass } from '@typegoose/typegoose';
import { College } from './CollegeSchema';

export const CollegeModel = getModelForClass(College);
