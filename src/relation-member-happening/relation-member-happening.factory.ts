import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { UuidGenerationService } from '../member/uuid-generation.service';

@injectable()
export class RelationMemberHappeningFactory {
    constructor(
        private uuidGenerationService: UuidGenerationService,
        @inject(IDENTIFIER.DIFactoryRelationMemberHappening)
        private DIFactoryRelationMemberHappening: (option: IRelationMemberHappening) => RelationMemberHappening) {
    }

    public generateUuid(): string {
        return this.uuidGenerationService.createNewUuid();
    }

    public create(option: IRelationMemberHappening): RelationMemberHappening {
        return this.recreate(option)
    }

    public recreate(option: IRelationMemberHappening): RelationMemberHappening {
        return this.DIFactoryRelationMemberHappening(option)
    }
}
