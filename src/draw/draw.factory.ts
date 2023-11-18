import UuidGenerationService from '../utils/uuid-generation.service';
import { Draw, NewDraw } from './draw.interface';

class DrawFactory {
  static create({ drawLinks }: NewDraw): Draw {
    const id = UuidGenerationService.createNewUuid();
    return {
      id,
      drawLinks,
    };
  }
}

export default DrawFactory;
