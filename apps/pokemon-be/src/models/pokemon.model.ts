import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pokemons' })
export class Pokemon {
  @AutoMap()
  @PrimaryColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar', length: 125 })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 64 })
  type1: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 64 })
  type2: string;

  @AutoMap()
  @Column({ type: 'text' })
  image: string;

  @AutoMap()
  @Column({ type: 'text' })
  ytbUrl: string;

  @AutoMap()
  @Column()
  total: number;

  @AutoMap()
  @Column()
  hp: number;

  @AutoMap()
  @Column()
  attack: number;

  @AutoMap()
  @Column()
  defense: number;

  @AutoMap()
  @Column()
  spAttack: number;

  @AutoMap()
  @Column()
  spDefense: number;

  @AutoMap()
  @Column()
  speed: number;

  @AutoMap()
  @Column()
  generation: number;

  @AutoMap()
  @Column()
  isLegendary: boolean;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
