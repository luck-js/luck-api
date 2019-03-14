import { injectable } from 'inversify';
import { Happening } from './happening';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { Member } from '../member/member';

@injectable()
export class HappeningFactory {
  constructor(private uuidGenerationService: UuidGenerationService) {}

  create(): Happening {
    const id = this.uuidGenerationService.createNewUuid();
    return new Happening(id);
  }

  recreate(
    id: string,
    name: string,
    description: string,
    isPublish: boolean,
    members: Member[],
  ): Happening {
    return new Happening(id, name, description, isPublish, members);
  }
}
