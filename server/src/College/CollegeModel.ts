import { getModelForClass } from '@typegoose/typegoose';
import { CollegeSchema } from './CollegeSchema';

export const CollegeModel = getModelForClass(CollegeSchema);
