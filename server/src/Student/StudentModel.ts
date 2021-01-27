import { getModelForClass } from '@typegoose/typegoose';
import { Student } from './StudentSchema';

export const StudentModel = getModelForClass(Student);
