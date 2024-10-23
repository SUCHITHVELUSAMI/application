import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TodoStatus {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'Default Todo Name' }) // Ensuring a default name is helpful for users
  name: string;

  @Column({ nullable: true }) // Optional description
  description?: string; // Mark as optional

  @Column({ type: 'timestamp', nullable: true }) // Optional time for the todo
  time?: Date; // Mark as optional

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.IN_PROGRESS }) // Default status set to IN_PROGRESS
  status: TodoStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false }) // Auto-set creation timestamp
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', nullable: false }) // Auto-update on changes
  updatedAt: Date;
}
