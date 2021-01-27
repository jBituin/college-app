import { ObjectId } from 'mongodb';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { CollegeModel } from '../College/CollegeModel';
import { CollegeSchema as College } from '../College/CollegeSchema';
import { CollegeDTO } from '../College/CollegeDTO';
import { ObjectIdScalar } from '../object-id.scalar';

@Resolver(() => College)
export class CollegeResolver {
  @Query(() => [College], { nullable: true })
  // todo: auth middleware
  // todo: paginate colleges
  async colleges(): Promise<College[]> {
    return await CollegeModel.find({});
  }

  @Query(() => College, { nullable: true })
  // todo: auth middleware
  async college(@Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId) {
    return await CollegeModel.findOne(collegeId);
  }

  @Mutation(() => College)
  // todo: auth middleware
  async createCollege(
    @Arg('college') collegeDTO: CollegeDTO
  ): Promise<College> {
    const college = await CollegeModel.create(collegeDTO);
    await college.save();
    return college;
  }

  @Mutation(() => College)
  // todo: auth middleware
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
  // todo: auth middleware
  async deleteCollege(
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ) {
    const deletedCollege = await CollegeModel.findByIdAndDelete(collegeId);
    return deletedCollege;
  }
}
