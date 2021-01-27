import { getModelForClass } from '@typegoose/typegoose';
import { Branch } from './BranchSchema';

export const BranchModel = getModelForClass(Branch);
