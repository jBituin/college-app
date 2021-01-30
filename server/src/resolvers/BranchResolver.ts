import { ObjectId } from 'mongodb';
import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { BranchModel } from '../Branch/BranchModel';
import { Branch } from '../Branch/BranchSchema';
import { BranchDTO } from '../Branch/BranchDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';

@Resolver(() => Branch)
export class BranchResolver {
  @Query(() => [Branch], { nullable: true })
  @UseMiddleware(isAuth)
  // todo: paginate branches
  async branches(): Promise<Branch[]> {
    return await BranchModel.find({});
  }

  @Query(() => Branch, { nullable: true })
  @UseMiddleware(isAuth)
  async branch(@Arg('branchId', () => ObjectIdScalar) branchId: ObjectId) {
    return await BranchModel.findOne(branchId);
  }

  @Mutation(() => Branch)
  @UseMiddleware(isAuth)
  async createBranch(@Arg('branch') branchDTO: BranchDTO): Promise<Branch> {
    const branch = await BranchModel.create(branchDTO);
    await branch.save();
    return branch;
  }

  @Mutation(() => Branch)
  @UseMiddleware(isAuth)
  async updateBranch(
    @Arg('branchId', () => ObjectIdScalar) branchId: ObjectId,
    @Arg('branch') branchDTO: BranchDTO
  ): Promise<Branch | null> {
    const branch = await BranchModel.findByIdAndUpdate(branchId, branchDTO, {
      new: true,
    });

    return branch;
  }

  @Mutation(() => Branch)
  @UseMiddleware(isAuth)
  async deleteBranch(
    @Arg('branchId', () => ObjectIdScalar) branchId: ObjectId
  ) {
    const deletedBranch = await BranchModel.findByIdAndDelete(branchId);
    return deletedBranch;
  }
}
