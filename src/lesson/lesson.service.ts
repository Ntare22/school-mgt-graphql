import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService { 
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    };

    async getAllLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = lessonInput;

        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return this.lessonRepository.save(lesson)
    }

    async assignStudentsToLesson(lessonId: string, studentsIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({ id: lessonId })
        lesson.students = [...lesson.students, ...studentsIds];
        return this.lessonRepository.save(lesson)
    }
}
