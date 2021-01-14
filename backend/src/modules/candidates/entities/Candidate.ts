import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Tech from './Tech';

@Entity('candidates')
class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  experience: string;

  @Column('varchar')
  city: string;

  @OneToMany(() => Tech, tech => tech.candidate)
  technologies: Tech[];

  @Column('boolean')
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Candidate;
