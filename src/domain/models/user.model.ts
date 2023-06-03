import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "./role.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 220 })
  name_user: string;

  @Column({ length: 20 })
  phone_user: string;

  @Column({ length: 180 })
  email_user: string;

  @Column({ length: 30 })
  password_user: string;

  @Column({ length: 20 })
  status_user: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];
}
