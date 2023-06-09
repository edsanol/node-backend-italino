import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @Column({ length: 220 })
  name_customer: string;

  @Column({ length: 100 })
  nit_customer: string;

  @Column({ length: 100 })
  address_customer: string;

  @Column({ length: 20 })
  phone_customer: string;

  @Column({ length: 20 })
  status_customer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;
}
