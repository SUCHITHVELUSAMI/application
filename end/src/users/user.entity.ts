import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  name: string;

  @Column({ length: 10 })
  @IsString()
  mobile: string;

  @Column({ length: 10 })
  @IsString()
  gender: string;

  @Column('simple-array')
  hobbies: string[];

  @Column({ unique: true }) // Ensure usernames are unique
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string; // Store the hashed password
}
