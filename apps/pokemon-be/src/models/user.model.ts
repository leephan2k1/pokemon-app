import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseModel } from './base/base.model';
import { AutoMap } from '@automapper/classes';
import { IsEmail, MinLength } from 'class-validator';
import { Token } from './token.model';
import { decodePassword, encodePassword } from '../utils/bcrypt';
import { Pokemon } from './pokemon.model';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @AutoMap()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  userName: string;

  @AutoMap()
  @IsEmail()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 })
  @MinLength(6)
  password: string;

  @AutoMap(() => [Pokemon])
  @ManyToMany(() => Pokemon)
  @JoinTable()
  favoritePokemons: Pokemon[];

  @AutoMap(() => [Token])
  @OneToMany(() => Token, (token) => token.user)
  @JoinColumn()
  refreshTokens: Token[];

  @AutoMap()
  @Column({ nullable: true })
  displayName?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;

    this.password = await encodePassword(this.password);
  }

  async comparePassword(password: string) {
    if (!this.password) return false;

    return decodePassword({
      currentPassword: this.password,
      reqPassword: password,
    });
  }
}
