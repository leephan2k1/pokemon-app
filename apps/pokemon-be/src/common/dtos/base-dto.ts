import { AutoMap } from '@automapper/classes';

export abstract class BaseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
