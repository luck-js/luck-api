import { injectable } from 'inversify';
import { MatchedElement, MatchingService } from './matching.service';
import { Member } from './member/member';

@injectable()
export class MatchingMemberService {
  static filterMembersWhoAbleToRandom(members: Member[]): Member[] {
    return members.filter(member => member.eventMemberRole.abilityToRandom);
  }

  static mapMembersToMatchedElements(members: Member[]): MatchedElement[] {
    return members.map(member => {
      const id = member.id;
      const matchedId = member.MatchedMemberId;
      return { id, matchedId };
    });
  }

  constructor(private matchingService: MatchingService) {}

  matchMembers(members: Member[]): Member[] {
    const participants = MatchingMemberService.filterMembersWhoAbleToRandom(members);
    const toMatchedElements = MatchingMemberService.mapMembersToMatchedElements(participants);
    const matchedElements = this.matchingService.randomMatchedElements(toMatchedElements);
    return this.mapMatchedElementsToMembers(members, matchedElements);
  }

  private mapMatchedElementsToMembers(
    members: Member[],
    matchedElements: MatchedElement[],
  ): Member[] {
    return members.reduce((membersState, member) => {
      const matchedElement = matchedElements.find(element => element.id === member.id);

      if (!matchedElement) {
        membersState.push(member);
        return membersState;
      } else {
        member.MatchedMemberId = matchedElement.matchedId;
        membersState.push(member);
        return membersState;
      }
    }, []);
  }
}
