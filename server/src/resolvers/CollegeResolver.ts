import { ObjectId } from 'mongodb';
import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { CollegeModel } from '../College/CollegeModel';
import { College } from '../College/CollegeSchema';
import { CollegeDTO } from '../College/CollegeDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';

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
    @Arg('college') collegeDTO: CollegeDTO
  ): Promise<College> {
    const college = await CollegeModel.create(collegeDTO);
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
}
