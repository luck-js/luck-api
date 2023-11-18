import { DrawRecord } from './draw.interface';

export interface DrawRepository {
  findById(id: string): Promise<DrawRecord | null>;
  add(draw: DrawRecord): Promise<DrawRecord>;
}
