import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.model";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id_inventory: number;

  @Column()
  reference_inventory: string;

  @Column()
  name_inventory: string;

  @Column()
  id_category: number;

  @Column()
  description_inventory: string;

  @Column()
  stock_inventory: number;

  @Column()
  status_inventory: string;

  @Column()
  selling_price_inventory: number;

  @Column()
  cost_price_inventory: number;

  @Column()
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
}
