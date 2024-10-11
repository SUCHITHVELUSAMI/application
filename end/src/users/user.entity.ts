import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10 })
  mobile: string;

  @Column({ length: 10 })
  gender: string;

  @Column('simple-array')
  hobbies: string[];

  @Column({ unique: true }) // Ensure usernames are unique
  username: string; // Add the username field

  @Column()
  email: string;

  @Column()
  password: string;
}
