import {injectable} from 'inversify';
import {Happening} from './happening';
import {UuidGenerationService} from '../member/uuid-generation.service';
import {IHappening} from './happening.model';

@injectable()
export class HappeningFactory {
    constructor(
        private uuidGenerationService: UuidGenerationService,
        private DIFactoryHappening: (id: string, name: string, description: string, isPublish: boolean) => Happening) {
    }

    public create(): string {
        return this.uuidGenerationService.createNewUuid();
    }

    public recreate({id, name, description, isPublish}: IHappening): Happening {
        return this.DIFactoryHappening(id, name, description, isPublish);
    }
}
