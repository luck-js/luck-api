import { DrawRecord } from './draw.interface';

export interface DrawRepository {
  add(draw: DrawRecord): Promise<DrawRecord>;
}
