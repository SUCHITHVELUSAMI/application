import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SPECIFIED = 'not-specified',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Ensure mobile number is unique
  mobile: string;

  @Column() // Use hashed passwords for security
  password: string;

  @Column() // Name of the user
  name: string;

  @Column({ nullable: true }) // Nullable email field
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NOT_SPECIFIED, // Default value if not provided
  })
  gender: Gender;

  @Column() // Country of the user
  country: string;

  @Column('simple-array', { default: '' }) // Stores hobbies as a simple array
  hobbies: string[];
}
