import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  time: Date;

  @Column({ default: 'pending' })
  status: string;
}
