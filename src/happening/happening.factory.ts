import { Happening } from './happening.interface';
import UuidGenerationService from '../utils/uuid-generation.service';
import { Member } from '../member/member.interface';

interface HappeningCreateOption {
  name: string;
  description: string;
  members?: Member[];
}

class HappeningFactory {
  static create({ name, description, members }: HappeningCreateOption): Happening {
    const id = UuidGenerationService.createNewUuid();
    const createdAt = new Date().toString();
    return {
      id,
      name,
      description,
      createdAt,
      members: members ?? [],
    };
  }
}

export default HappeningFactory;
