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

  @Column()
  reference_category: string;

  @Column()
  name_category: string;

  @Column()
  status_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.category)
  inventory: Inventory[];
}
