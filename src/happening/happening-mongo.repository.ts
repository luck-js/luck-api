import { HappeningRepository } from './happening.repository';
import { Happening } from './happening.interface';
import HappeningModel from './happening.model';

class HappeningMongoRepository implements HappeningRepository {
  getAll(): Promise<Happening[]> {
    return HappeningModel.find().exec();
  }
}

export default HappeningMongoRepository;
