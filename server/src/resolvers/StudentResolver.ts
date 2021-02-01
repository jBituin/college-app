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
import { StudentModel } from '../Student/StudentModel';
import { Student } from '../Student/StudentSchema';
import { StudentDTO } from '../Student/StudentDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';
import { College } from '../College/CollegeSchema';

@ObjectType()
class StudentItem extends Student {
  @Field()
  college!: College;

  @Field()
  fullName!: string;
}

@Resolver(() => Student)
export class StudentResolver {
  @Query(() => [StudentItem], { nullable: true })
  @UseMiddleware(isAuth)
  async students(): Promise<StudentItem[]> {
    const aggregate = StudentModel.aggregate();
    aggregate.lookup({
      from: 'colleges',
      localField: 'collegeId',
      foreignField: '_id',
      as: 'college',
    });
    aggregate.unwind('$college');
    aggregate.addFields({
      fullName: {
        $concat: ['$firstName', ' ', '$lastName'],
      },
    });

    const students: StudentItem[] = await aggregate.exec();
    return students;
  }

  @Query(() => Student, { nullable: true })
  @UseMiddleware(isAuth)
  async student(@Arg('studentId', () => ObjectIdScalar) studentId: ObjectId) {
    return await StudentModel.findOne(studentId);
  }

  @Mutation(() => Student)
  @UseMiddleware(isAuth)
  async createStudent(
    @Arg('student') studentDTO: StudentDTO,
    @Arg('collegeId', () => ObjectIdScalar) collegeId: ObjectId
  ): Promise<Student> {
    const student = await StudentModel.create({
      ...studentDTO,
      collegeId,
    });
    await student.save();
    return student;
  }

  @Mutation(() => Student)
  @UseMiddleware(isAuth)
  async updateStudent(
    @Arg('studentId', () => ObjectIdScalar) studentId: ObjectId,
    @Arg('student') studentDTO: StudentDTO
  ): Promise<Student | null> {
    const student = await StudentModel.findByIdAndUpdate(
      studentId,
      studentDTO,
      {
        new: true,
      }
    );

    return student;
  }

  @Mutation(() => Student)
  @UseMiddleware(isAuth)
  async deleteStudent(
    @Arg('studentId', () => ObjectIdScalar) studentId: ObjectId
  ) {
    const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
    return deletedStudent;
  }
}
