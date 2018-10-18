import { injectable } from 'inversify';
import { Happening } from './happening';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { IHappening } from './happening.model';

@injectable()
export class HappeningFactory {
    constructor(
        private uuidGenerationService: UuidGenerationService,
        private DIFactoryHappening: (option: IHappening) => Happening) {
    }

    public create(): string {
        return this.uuidGenerationService.createNewUuid();
    }

    public recreate(option: IHappening): Happening {
        return this.DIFactoryHappening(option);
    }
}
