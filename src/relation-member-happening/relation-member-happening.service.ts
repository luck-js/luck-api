import { injectable } from 'inversify';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMemberView } from './member-view.model';
import { HappeningFactory } from '../happening/happening.factory';
import { RelationMemberHappeningFactory } from './relation-member-happening.factory';
import { HappeningRepository } from '../happening/happening.repository';

@injectable()
export class RelationMemberHappeningService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private happeningRepository: HappeningRepository,
        private happeningFactory: HappeningFactory,
        private relationMemberHappeningFactory: RelationMemberHappeningFactory) {
    }

    public createHappening(): string {
        const relationId = this.relationMemberHappeningFactory.generateUuid();

        const happening = this.happeningFactory.create();
        const member = happening.addMember(relationId);

        const relation = this.relationMemberHappeningFactory.create(relationId, happening, member);

        this.happeningRepository.add(happening);

        this.relationMemberHappeningRepository.add({ id: relation.Id, happeningId: happening.id, memberId: member.id });

        return relation.Id;
    }

    public getDataView(id: string): IParticipationHappeningView {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = relation.getMember();
        const happening = relation.getHappening();

        return {
            member, happening
        }
    }

    public getMatchedMember(idRelation: string): IMemberView {
        const relation = this.relationMemberHappeningRepository.get(idRelation);
        const { matchedMemberId } = relation.getMember();
        const { id, name }  = relation.getHappening().getMember(matchedMemberId);

        return { id, name };
    }
}
