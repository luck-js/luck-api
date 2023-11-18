import { DrawRepository } from './draw.repository';
import { DrawRecord } from './draw.interface';
import DrawModel from './draw.model';

class DrawMongoRepository implements DrawRepository {
  findById(id: string): Promise<DrawRecord | null> {
    try {
      return DrawModel.findOne({ id }).exec();
    } catch (error) {
      console.error('Error while retrieving the draw:', error);
      return Promise.resolve(null);
    }
  }
  add(draw: DrawRecord): Promise<DrawRecord> {
    return new DrawModel(draw).save();
  }
}

export default DrawMongoRepository;
