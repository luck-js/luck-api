import { Member } from './member.interface';
import MatchingService, { MatchedElement } from '../utils/matching.service';

type MatchedMember = Member & MatchedElement;

class MatchingMemberService {
  private static mapMatchedMemberToMembers(matchedElements: MatchedMember[]): Member[] {
    return matchedElements.map(({ name, id, matchedId }) => ({
      name,
      id,
      matchedMemberId: matchedId,
    }));
  }

  static matchMembers(members: Member[]): Member[] {
    const matchedMembers = MatchingService.matchElements<Member>(members);

    return MatchingMemberService.mapMatchedMemberToMembers(matchedMembers);
  }
}

export default MatchingMemberService;
