import { DrawLinkRecord } from './draw-link.interface';

export interface DrawLinkRepository {
  findByIds(ids: string[]): Promise<DrawLinkRecord[]>;
  addList(drawLinks: DrawLinkRecord[]): Promise<DrawLinkRecord[]>;
}
