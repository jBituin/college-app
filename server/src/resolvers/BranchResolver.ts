import { ObjectId } from 'mongodb';
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  ObjectType,
  Field,
} from 'type-graphql';
import { BranchModel } from '../Branch/BranchModel';
import { Branch } from '../Branch/BranchSchema';
import { BranchDTO } from '../Branch/BranchDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';
import { AssignStudentDTO } from '../Branch/AssignStudentDTO';
import { Student } from '../Student/StudentSchema';
import { StudentModel } from '../Student/StudentModel';
import { College } from '../College/CollegeSchema';

@ObjectType()
class BranchItem extends Branch {
  @Field()
  numberOfStudents!: number;

  @Field()
  college: College;
}
@Resolver(() => Branch)
export class BranchResolver {
  @Query(() => [BranchItem], { nullable: true })
  @UseMiddleware(isAuth)
  // todo: paginate branches
  async branches(): Promise<BranchItem[]> {
    const aggregate = BranchModel.aggregate();
    aggregate.lookup({
      from: 'colleges',
      localField: 'collegeId',
      foreignField: '_id',
      as: 'college',
    });
    aggregate.unwind('$college');
    aggregate.project({
      _id: true,
      name: true,
      students: true,
      collegeId: true,
      college: true,
      numberOfStudents: { $size: '$students' },
    });

    // return await BranchModel.find({});
    const branches: BranchItem[] = await aggregate.exec();
    console.log(
      'JSON.stringify(branches, null, 2)',
      JSON.stringify(branches, null, 2)
    );
    return branches;
  }

  @Query(() => Branch, { nullable: true })
  @UseMiddleware(isAuth)
  async branch(@Arg('branchId', () => ObjectIdScalar) branchId: ObjectId) {
    return await BranchModel.findOne(branchId);
  }

  @Mutation(() => Branch)
  @UseMiddleware(isAuth)
  async createBranch(
    @Arg('branch') branchDTO: BranchDTO,
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ): Promise<Branch> {
    const branch = await BranchModel.create({
      ...branchDTO,
      collegeId,
      students: [],
    });
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async assignStudent(
    @Arg('assignStudent') assignStudentDTO: AssignStudentDTO
  ) {
    const { branchId, studentId } = assignStudentDTO;
    await BranchModel.update(
      {
        _id: new ObjectId(branchId),
      },
      {
        $addToSet: {
          students: new ObjectId(studentId),
        },
      }
    );

    return true;
  }

  @Query(() => [Student])
  @UseMiddleware(isAuth)
  async branchStudents(
    @Arg('branchId', () => ObjectIdScalar) branchId: ObjectId
  ): Promise<Student[]> {
    const branch = await BranchModel.findOne(branchId);
    if (!branch) {
      throw new Error('Branch does not exist');
    }
    const students = await StudentModel.find({
      _id: {
        $in: branch.students,
      },
    });
    return students;
  }
}
