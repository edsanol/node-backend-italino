import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Role } from "./role.model";
import { Customer } from "./customer.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 220, unique: true })
  name_user: string;

  @Column({ length: 20 })
  phone_user: string;

  @Column({ length: 180, unique: true })
  email_user: string;

  @Column({ length: 300 })
  password_user: string;

  @Column({ length: 20 })
  status_user: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  rol: Role;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];
}
