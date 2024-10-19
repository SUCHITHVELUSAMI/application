import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../todos/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })  // Optional field for mobile
  mobile: string;

  @Column({ nullable: true })  // Optional field for gender
  gender: string;

  @Column({ nullable: true })  // Optional field for email
  email: string;

  @Column({ nullable: true })  // Optional field for country (new field added)
  country: string;

  @Column({ nullable: true })  // Optional field for hobbies
  hobbies: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
