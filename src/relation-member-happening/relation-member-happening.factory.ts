import { inject, injectable } from 'inversify';
import IDENTIFIER from '../identifiers';
import { IRelationMemberHappening } from './relation-member-happening.model';
import { RelationMemberHappening } from './relation-member-happening';
import { Happening } from '../happening/happening';
import { Member } from '../member/member';
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

    public create(id: string, happening: Happening, member: Member): RelationMemberHappening {
        return this.recreate({ id, happeningId: happening.id, memberId: member.id })
    }

    public recreate(option: IRelationMemberHappening): RelationMemberHappening {
        return this.DIFactoryRelationMemberHappening(option)
    }
}
