import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inventory } from "./inventory.model";
import { Order } from "./order.model";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id_order_detail: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.order_details)
  inventory: Inventory;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.order_details)
  order: Order;
}
