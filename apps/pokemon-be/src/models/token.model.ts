import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { BaseModel } from './base/base.model';

@Entity({ name: 'tokens' })
export class Token extends BaseModel {
  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Index({ unique: true })
  @Column()
  token: string;
}
