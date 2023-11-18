import { HappeningRepository } from './happening.repository';
import { HappeningRecord } from './happening.interface';
import HappeningModel from './happening.model';

class HappeningMongoRepository implements HappeningRepository {
  add(happening: HappeningRecord): Promise<HappeningRecord> {
    return new HappeningModel(happening).save();
  }
}

export default HappeningMongoRepository;
