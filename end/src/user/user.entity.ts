// /backend/src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column({ nullable: true }) // Optional field
  gender?: string;

  @Column({ nullable: true }) // Optional field
  country?: string;

  @Column({ unique: true }) // Ensure email is unique
  email: string;

  @Column()
  password: string;

  @Column('simple-array') // Storing hobbies as a comma-separated string
  hobbies: string[];
}
