import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { createStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) {}

    async createStudent(createStudentInput: createStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })
        
        return this.studentRepository.save(student);
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ where: { id }});
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        });
    }
}
