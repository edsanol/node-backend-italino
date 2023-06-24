import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customer } from "./customer.model";
import { User } from "./user.model";
import { OrderDetail } from "./order-detail.model";
import { OrderReturn } from "./order-return.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column()
  reference_order: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ length: 20 })
  status_order: string;

  @Column({ length: 20 })
  payment_order: string;

  @Column({ length: 20 })
  type_order: string;

  @Column({ type: "float" })
  total_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  order_details: OrderDetail[];

  @OneToMany(() => OrderReturn, (orderReturns) => orderReturns.order)
  order_returns: OrderReturn[];
}
