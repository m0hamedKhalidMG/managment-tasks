import { Controller, Param, UseGuards, Request } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Get, Body, Post, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tasks } from '../models/tasks.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() task: tasks, @Request() req): Observable<tasks> {
    return this.taskService.createTask(req.user, task);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Request() req): Observable<tasks[]> {
    return this.taskService.findAllTask(req.user.id);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findbyid(@Param('id') id: number): Observable<tasks> {
    return this.taskService.findById(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() task: tasks,
  ): Observable<UpdateResult> {
    return this.taskService.updateTask(id, task);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.taskService.deleteTask(id);
  }
}
