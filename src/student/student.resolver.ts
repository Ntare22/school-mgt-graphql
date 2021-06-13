import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { createStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentServie: StudentService
    ) {}

    @Mutation(returns => StudentType)
    createStudent(
        @Args('studentInput') studentInput: createStudentInput
    ) {
        return this.studentServie.createStudent(studentInput);
    }
    
    @Query(returns => StudentType)
    getStudent(
        @Args('id') id: string
    ) {
        return this.studentServie.getStudent(id);
    }

    @Query(returns => [StudentType])
    getAllStudents() {
        return this.studentServie.getAllStudents()
    }
}
