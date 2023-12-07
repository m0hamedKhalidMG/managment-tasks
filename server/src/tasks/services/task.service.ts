/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tasksEntity } from '../models/task.entity';
import { Repository } from 'typeorm';
import { tasks } from '../models/tasks.interface';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from 'src/auth/models/user.class';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(tasksEntity)
    private readonly taskRepository: Repository<tasksEntity>,
  ) {}
  createTask(user: User, Task: tasks): Observable<tasks> {
    Task.owner = user;
    return from(this.taskRepository.save(Task));
  }
  findAllTask(id): Observable<tasks[]> {
    return from(this.taskRepository.find({where: { owner:{id:id} }}));
  }
  findById(id: number): Observable<tasks | undefined> {
    return from(this.taskRepository.findOne({ where: { id } }))
  }
  updateTask(id: number, Task: tasks): Observable<UpdateResult> {
    return from(this.taskRepository.update(id, Task));
  }
  deleteTask(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete(id));
  }
}
