import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number; // Automatically generated ID for the todo item

  @Column({ length: 100 })
  title: string; // Title of the todo item

  @Column({ length: 255 })
  description: string; // Description of the todo item

  @Column()
  time: Date; // Time associated with the todo item

  @Column({ default: 'pending' })
  status: string; // Status of the todo item, default is 'pending'
}
