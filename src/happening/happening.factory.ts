import { injectable } from 'inversify';
import { Happening } from './happening';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { IHappening } from './happening.model';

@injectable()
export class HappeningFactory {
  constructor(
    private uuidGenerationService: UuidGenerationService,
    private DIFactoryHappening: (option: IHappening) => Happening,
  ) {}

  public create(): Happening {
    const id = this.uuidGenerationService.createNewUuid();
    const name = '';
    const description = '';
    const isPublish = false;
    const memberIdList = [];

    return this.recreate({ id, name, description, isPublish, memberIdList });
  }

  public recreate(option: IHappening): Happening {
    return this.DIFactoryHappening(option);
  }
}
