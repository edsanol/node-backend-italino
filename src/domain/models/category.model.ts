import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inventory } from "./inventory.model";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column({ length: 120 })
  reference_category: string;

  @Column({ length: 150 })
  name_category: string;

  @Column({ length: 220 })
  description_category: string;

  @Column({ length: 60 })
  status_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.category)
  inventory: Inventory[];
}
