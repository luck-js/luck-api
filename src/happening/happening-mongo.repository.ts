import { HappeningRepository } from './happening.repository';
import { HappeningRecord } from './happening.interface';
import HappeningModel from './happening.model';

class HappeningMongoRepository implements HappeningRepository {
  findById(id: string): Promise<HappeningRecord | null> {
    try {
      return HappeningModel.findOne({ id }).exec();
    } catch (error) {
      console.error('Error while retrieving the happening:', error);
      return Promise.resolve(null);
    }
  }

  add(happening: HappeningRecord): Promise<HappeningRecord> {
    return new HappeningModel(happening).save();
  }
}

export default HappeningMongoRepository;
