// src/todos/todo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  time: Date;

  @Column({ nullable: false }) // Ensure status cannot be null
  status: 'in progress' | 'completed';
}
