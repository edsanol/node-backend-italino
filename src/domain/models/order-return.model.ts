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
export class OrderReturn {
  @PrimaryGeneratedColumn()
  id_order_return: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.order_returns)
  inventory: Inventory;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.order_returns)
  order: Order;
}
