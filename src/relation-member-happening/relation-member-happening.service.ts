import { injectable } from 'inversify';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMemberView } from './member-view.model';

@injectable()
export class RelationMemberHappeningService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository) {
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
