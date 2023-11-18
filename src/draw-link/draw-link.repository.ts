import { DrawLinkRecord } from './draw-link.interface';

export interface DrawLinkRepository {
  addList(drawLinks: DrawLinkRecord[]): Promise<DrawLinkRecord[]>;
}
