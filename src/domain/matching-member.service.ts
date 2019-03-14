import { injectable } from 'inversify';
import { MatchedElement, MatchingService } from './matching.service';
import { Member } from './member/member';

@injectable()
export class MatchingMemberService {
  static filterMembersWhoAbleToRandom(members: Member[]): Member[] {
    return members.filter(member => member.eventMemberRole.abilityToRandom);
  }

  static mapMembersToMatchingElements(members: Member[]): MatchedElement[] {
    return members.map(member => {
      const id = member.id;
      const matchedId = member.MatchedMemberId;
      return { id, matchedId };
    });
  }

  constructor(private matchingService: MatchingService) {}

  matchMembers(members: Member[]): Member[] {
    return this.matchMembersWhoAbleToRandom(members);
  }

  private matchMembersWhoAbleToRandom(members: Member[]): Member[] {
    const participants = MatchingMemberService.filterMembersWhoAbleToRandom(members);
    const matchedElements = MatchingMemberService.mapMembersToMatchingElements(participants);
    const newMatchedElements = this.matchingService.randomElements(matchedElements);
    return this.mapMatchingElementsToElements(members, newMatchedElements);
  }

  private mapMatchingElementsToElements(
    members: Member[],
    matchedElements: MatchedElement[],
  ): Member[] {
    return members.reduce((prevState, member) => {
      const element = matchedElements.find(element => element.id === member.id);

      if (!element) {
        prevState.push(member);
        return prevState;
      } else {
        member.MatchedMemberId = element.matchedId;
        prevState.push(member);
        return prevState;
      }
    }, []);
  }
}
