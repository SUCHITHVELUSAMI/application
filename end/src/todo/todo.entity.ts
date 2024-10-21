import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false }) // Ensure this column cannot be null
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    time: Date;

    @Column({ nullable: true })
    status: string;
}
