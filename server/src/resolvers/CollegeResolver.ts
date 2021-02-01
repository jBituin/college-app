import { ObjectId } from 'mongodb';
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { CollegeModel } from '../College/CollegeModel';
import { College } from '../College/CollegeSchema';
import { CollegeDTO } from '../College/CollegeDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';
import { MyContext } from '../MyContext';
import { Student } from '../Student/StudentSchema';
import { StudentModel } from '../Student/StudentModel';
import { Branch } from '../Branch/BranchSchema';
import { BranchModel } from '../Branch/BranchModel';

@Resolver(() => College)
export class CollegeResolver {
  @Query(() => [College], { nullable: true })
  @UseMiddleware(isAuth)
  // todo: paginate colleges
  async colleges(): Promise<College[]> {
    return await CollegeModel.find({});
  }

  @Query(() => College, { nullable: true })
  @UseMiddleware(isAuth)
  async college(@Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId) {
    return await CollegeModel.findOne(collegeId);
  }

  @Mutation(() => College)
  @UseMiddleware(isAuth)
  async createCollege(
    @Arg('college') collegeDTO: CollegeDTO,
    @Ctx() { payload }: MyContext
  ): Promise<College> {
    const college = await CollegeModel.create({
      ...collegeDTO,
      createdBy: new ObjectId(payload!.userId),
    });
    await college.save();
    return college;
  }

  @Mutation(() => College)
  @UseMiddleware(isAuth)
  async updateCollege(
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId,
    @Arg('college') collegeDTO: CollegeDTO
  ): Promise<College | null> {
    const college = await CollegeModel.findByIdAndUpdate(
      collegeId,
      collegeDTO,
      {
        new: true,
      }
    );

    return college;
  }

  @Mutation(() => College)
  @UseMiddleware(isAuth)
  async deleteCollege(
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ) {
    const deletedCollege = await CollegeModel.findByIdAndDelete(collegeId);
    return deletedCollege;
  }

  @Query(() => [Student])
  @UseMiddleware(isAuth)
  async collegeStudents(
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ): Promise<Student[]> {
    const college = await CollegeModel.findOne(collegeId);
    if (!college) {
      throw new Error('College does not exist');
    }
    const students = await StudentModel.find({
      collegeId: ObjectIdScalar.serialize(collegeId),
    });
    return students;
  }

  @Query(() => [Branch])
  @UseMiddleware(isAuth)
  async collegeBranches(
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ): Promise<Branch[]> {
    const college = await CollegeModel.findOne(collegeId);
    if (!college) {
      throw new Error('College does not exist');
    }
    const branches = await BranchModel.find({
      collegeId: ObjectIdScalar.serialize(collegeId),
    });
    return branches;
  }
}
