import { ObjectId } from 'mongodb';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { BranchModel } from '../Branch/BranchModel';
import { Branch } from '../Branch/BranchSchema';
import { BranchDTO } from '../Branch/BranchDTO';
import { ObjectIdScalar } from '../object-id.scalar';

@Resolver(() => Branch)
export class BranchResolver {
  @Query(() => [Branch], { nullable: true })
  // todo: auth middleware
  // todo: paginate branches
  async branches(): Promise<Branch[]> {
    return await BranchModel.find({});
  }

  @Query(() => Branch, { nullable: true })
  // todo: auth middleware
  async branch(@Arg('branchId', () => ObjectIdScalar) branchId: ObjectId) {
    return await BranchModel.findOne(branchId);
  }

  @Mutation(() => Branch)
  // todo: auth middleware
  async createBranch(@Arg('branch') branchDTO: BranchDTO): Promise<Branch> {
    const branch = await BranchModel.create(branchDTO);
    await branch.save();
    return branch;
  }

  @Mutation(() => Branch)
  // todo: auth middleware
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
  // todo: auth middleware
  async deleteBranch(
    @Arg('branchId', () => ObjectIdScalar) branchId: ObjectId
  ) {
    const deletedBranch = await BranchModel.findByIdAndDelete(branchId);
    return deletedBranch;
  }
}
