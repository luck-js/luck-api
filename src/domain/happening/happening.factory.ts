import { injectable } from 'inversify';
import { Happening } from './happening';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { Member } from '../member/member';

@injectable()
export class HappeningFactory {
  constructor(private uuidGenerationService: UuidGenerationService) {}

  create(): Happening {
    const id = this.uuidGenerationService.createNewUuid();
    const createdAt = new Date().toString();
    return new Happening(id, createdAt);
  }

  recreate(
    id: string,
    createdAt: string,
    name: string,
    description: string,
    isPublish: boolean,
    members: Member[],
  ): Happening {
    return new Happening(id, createdAt, name, description, isPublish, members);
  }
}
