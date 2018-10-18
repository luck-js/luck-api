import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { MemberRepository } from '../member/member.repository';
import { HappeningRepository } from '../happening/happening.repository';
import { IParticipationHappeningView } from './participation-happening-view.model';
import { IMemberView } from './member-view.model';

export class RelationMemberHappeningService {
    constructor(
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private memberRepository: MemberRepository,
        private happeningRepository: HappeningRepository) {
    }

    public getDataView(id: string): IParticipationHappeningView {
        const relation = this.relationMemberHappeningRepository.get(id);
        const member = this.memberRepository.getByIndex(relation.memberId);
        const happening = this.happeningRepository.getByIndex(relation.happeningId);

        return {
            member, happening
        }
    }

    public getMatchedMember(id: string): IMemberView {
        const member = this.memberRepository.getByIndex(id);
        return this.memberRepository.getByIndex(member.matchedMemberId);
    }
}
