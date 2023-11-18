import { DrawLinkRecord } from './draw-link.interface';

export interface DrawLinkRepository {
  findById(id: string): Promise<DrawLinkRecord | null>;
  findByIds(ids: string[]): Promise<DrawLinkRecord[]>;
  addList(drawLinks: DrawLinkRecord[]): Promise<DrawLinkRecord[]>;
}
