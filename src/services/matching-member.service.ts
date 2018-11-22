import { injectable } from 'inversify';
import { MatchedElement, MatchingService } from './matching.service';
import { Member } from '../member/member';


@injectable()
export class MatchingMemberService {

    static filterMembersWhoAbleToRandom(memberList: Member[]): Member[] {
        return memberList.filter((member) => member.eventMemberRole.abilityToRandom);
    }

    static mapMemberListToMatchingElementList(memberList: Member[]): MatchedElement[] {
        return memberList.map((member) => {
            const id = member.id;
            const matchedId = member.MatchedMemberId;
            return { id, matchedId }
        });
    }

    constructor(private matchingService: MatchingService) {

    }

    public matchMemberList(memberList: Member[]): Member[] {
        return this.matchMembersWhoAbleToRandom(memberList);
    }

    private matchMembersWhoAbleToRandom(memberList: Member[]): Member[] {
        const participantList = MatchingMemberService.filterMembersWhoAbleToRandom(memberList);
        const matchedElementList = MatchingMemberService.mapMemberListToMatchingElementList(participantList);
        const newMatchedElementList = this.matchingService.randomElements(matchedElementList);
        return this.mapMatchingElementListToElementList(memberList, newMatchedElementList);
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
