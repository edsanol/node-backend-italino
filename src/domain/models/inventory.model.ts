import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.model";
import { OrderDetail } from "./order-detail.model";
import { OrderReturn } from "./order-return.model";
import { AddInventory } from "./add-inventory.model";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id_inventory: number;

  @Column({ length: 120 })
  reference_inventory: string;

  @Column({ length: 150 })
  name_inventory: string;

  @Column({ length: 220 })
  description_inventory: string;

  @Column()
  stock_inventory: number;

  @Column({ length: 60 })
  status_inventory: string;

  @Column()
  selling_price_inventory: number;

  @Column()
  cost_price_inventory: number;

  @Column({ length: 600 })
  image_inventory: string;

  @Column()
  publicated_inventory: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.inventory)
  @JoinColumn({ name: "id_category" })
  category: Category;

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.inventory)
  order_details: OrderDetail[];

  @OneToMany(() => OrderReturn, (order_returns) => order_returns.inventory)
  order_returns: OrderReturn[];

  @OneToMany(() => AddInventory, (add_inventory) => add_inventory.inventory)
  add_inventory: AddInventory[];
}
