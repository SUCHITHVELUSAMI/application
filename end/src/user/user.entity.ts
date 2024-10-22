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

  @Column({ unique: true })
  mobile: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: false, nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NOT_SPECIFIED,
  })
  gender: Gender;

  @Column()
  country: string;

  @Column('simple-array', { default: '' })
  hobbies: string[];
}
