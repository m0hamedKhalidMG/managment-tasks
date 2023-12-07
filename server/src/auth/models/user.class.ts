/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';
import { tasks } from 'src/tasks/models/tasks.interface';
 export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  tasks?: tasks[];
}