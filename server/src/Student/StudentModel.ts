import { getModelForClass } from '@typegoose/typegoose';
import { StudentSchema } from './StudentSchema';

export const StudentModel = getModelForClass(StudentSchema);
