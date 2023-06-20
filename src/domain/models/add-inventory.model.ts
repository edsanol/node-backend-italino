import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Inventory } from "./inventory.model";
import { User } from "./user.model";

@Entity()
export class AddInventory {
  @PrimaryGeneratedColumn()
  id_add_inventory: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.add_inventory)
  inventory: Inventory;

  @ManyToOne(() => User, (user) => user.add_inventory)
  user: User;

  @Column()
  quantity: number;

  @Column()
  detail: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
