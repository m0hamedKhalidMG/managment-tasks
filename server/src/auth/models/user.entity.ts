/* eslint-disable prettier/prettier */
import { tasksEntity } from '../../tasks/models/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @OneToMany(() => tasksEntity, (_tasksEntity) => _tasksEntity.owner)
  tasks: tasksEntity[];

}
