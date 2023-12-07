import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tasksEntity } from './models/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tasksEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
