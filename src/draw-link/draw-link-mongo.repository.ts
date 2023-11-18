import { DrawLinkRepository } from './draw-link.repository';
import { DrawLinkRecord } from './draw-link.interface';
import DrawLinkModel from './draw-link.model';

class DrawLinkMongoRepository implements DrawLinkRepository {
  findByIds(ids: string[]): Promise<DrawLinkRecord[]> {
    try {
      return DrawLinkModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      console.error('Error while fetching the list of draw links:', error);
      return Promise.resolve([]);
    }
  }
  addList(drawLinks: DrawLinkRecord[]): Promise<DrawLinkRecord[]> {
    return DrawLinkModel.insertMany(drawLinks);
  }
}

export default DrawLinkMongoRepository;
