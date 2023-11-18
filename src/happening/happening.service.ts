import { HappeningRepository } from './happening.repository';
import { HappeningView } from './happening.interface';

class HappeningService {
  constructor(private happeningRepository: HappeningRepository) {}

  async getAll(): Promise<HappeningView[]> {
    const happenings = await this.happeningRepository.getAll();
    return happenings.map(({ id }) => ({ id }));
  }
}

export default HappeningService;
