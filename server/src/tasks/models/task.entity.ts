/* eslint-disable prettier/prettier */

import { UserEntity } from 'src/auth/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('Tasks')
export class tasksEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  desc: string;
  @Column({ default: '' })
  title: string;
  @Column({ default: false })
  finished: boolean;
  @Column({ default: '' })
  catagory: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.tasks)
  owner: UserEntity;
}
