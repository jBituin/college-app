import { ObjectId } from 'mongodb';
import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { StudentModel } from '../Student/StudentModel';
import { Student } from '../Student/StudentSchema';
import { StudentDTO } from '../Student/StudentDTO';
import { ObjectIdScalar } from '../object-id.scalar';
import { isAuth } from '../auth';

@Resolver(() => Student)
export class StudentResolver {
  @Query(() => [Student], { nullable: true })
  @UseMiddleware(isAuth)
  async students(): Promise<Student[]> {
    return await StudentModel.find({});
  }

  @Query(() => Student, { nullable: true })
  @UseMiddleware(isAuth)
  async student(@Arg('studentId', () => ObjectIdScalar) studentId: ObjectId) {
    return await StudentModel.findOne(studentId);
  }

  @Mutation(() => Student)
  @UseMiddleware(isAuth)
  async createStudent(
    @Arg('student') studentDTO: StudentDTO
  ): Promise<Student> {
    const student = await StudentModel.create(studentDTO);
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
