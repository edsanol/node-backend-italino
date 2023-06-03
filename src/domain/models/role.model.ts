import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.model";
import { Activity } from "./activity.model";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id_role: number;

  @Column({ length: 50 })
  name_role: string;

  @Column({ length: 250 })
  description_role: string;

  @Column({ length: 20 })
  status_role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToMany(() => Activity)
  @JoinTable()
  activities!: Activity[];
}
