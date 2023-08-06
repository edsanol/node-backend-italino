import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Role } from "./role.model";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id_activity: number;

  @Column({ length: 255 })
  name_activity: string;

  @Column({ length: 255 })
  description_activity: string;

  @Column({ length: 20 })
  status_activity: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role)
  roles: Role[];
}
