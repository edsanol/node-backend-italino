import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  @OneToMany(() => User, (user) => user.rol)
  users: User[];

  @ManyToMany(() => Activity)
  @JoinTable()
  activities!: Activity[];
}
