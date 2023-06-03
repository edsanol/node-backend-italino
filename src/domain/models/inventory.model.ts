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
