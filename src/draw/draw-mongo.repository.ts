import { DrawRepository } from './draw.repository';
import { DrawRecord } from './draw.interface';
import DrawModel from './draw.model';

class DrawMongoRepository implements DrawRepository {
  add(draw: DrawRecord): Promise<DrawRecord> {
    return new DrawModel(draw).save();
  }
}

export default DrawMongoRepository;
