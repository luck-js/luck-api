import UuidGenerationService from '../utils/uuid-generation.service';
import { DrawLink, NewDrawLink } from './draw-link.interface';

class DrawLinkFactory {
  static create({ happening, member }: NewDrawLink): DrawLink {
    const id = UuidGenerationService.createNewUuid();
    return {
      id,
      happening,
      member,
    };
  }
}

export default DrawLinkFactory;
