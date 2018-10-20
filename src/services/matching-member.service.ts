import { injectable } from 'inversify';
import { MatchedElement, MatchingService } from './matching.service';
import { MemberRepository } from '../member/member.repository';
import { Member } from '../member/member';


@injectable()
export class MatchingMemberService {

    constructor(private matchingService: MatchingService,
                private memberRepository: MemberRepository) {

    }

    public matchMemberList() {
        const memberList = this.getMemberToMatching();
        const newMemberList = this.matchMembersWhoAbleToRandom(memberList);
        this.updateNewMemberList(newMemberList);
    }

    private getMemberToMatching(): Member[] {
        return this.memberRepository.getList();
    }

    private matchMembersWhoAbleToRandom(memberList: Member[]): Member[] {
        const participantList = this.filterMembersWhoAbleToRandom(memberList);
        const matchedElementList = this.mapMemberListToMatchingElementList(participantList);
        const newMatchedElementList = this.matchingService.randomElements(matchedElementList);
        return this.mapMatchingElementListToElementList(memberList, newMatchedElementList);
    }

    private updateNewMemberList(memberList: Member[]) {
        this.memberRepository.updateList(memberList)
    }

    private filterMembersWhoAbleToRandom(memberList: Member[]): Member[] {
        return memberList.filter((member) => member.eventMemberRole.abilityToRandom);
    }

    private mapMemberListToMatchingElementList(memberList: Member[]): MatchedElement[] {
        return memberList.map((member) => {
            const id = member.id;
            const matchedId = member.MatchedMemberId;
            return { id, matchedId }
        });
    }

    private mapMatchingElementListToElementList(memberList: Member[], matchedElementList: MatchedElement[]): Member[] {
        return memberList.reduce((prevState, member) => {
            const element = matchedElementList.find((element) => element.id === member.id);

            if (!element) {
                prevState.push(member);
                return prevState;
            } else {
                member.MatchedMemberId = element.matchedId;
                prevState.push(member);
                return prevState;
            }
        }, [])
    }
}
