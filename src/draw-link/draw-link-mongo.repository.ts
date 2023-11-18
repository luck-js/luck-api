import { DrawLinkRepository } from './draw-link.repository';
import { DrawLinkRecord } from './draw-link.interface';
import DrawLinkModel from './draw-link.model';

class DrawLinkMongoRepository implements DrawLinkRepository {
  addList(drawLinks: DrawLinkRecord[]): Promise<DrawLinkRecord[]> {
    return DrawLinkModel.insertMany(drawLinks);
  }
}

export default DrawLinkMongoRepository;
