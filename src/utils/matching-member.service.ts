import { Member } from '../member/member.interface';
import MatchingService, { MatchedElement } from './matching.service';

interface MatchedMember extends Member, MatchedElement {}

class MatchingMemberService {
  private static mapMembersToMatchedElements(members: Member[]): MatchedMember[] {
    return members.map(({ matchedMemberId, ...rest }) => ({
      ...rest,
      matchedMemberId,
      matchedId: matchedMemberId ?? '',
    }));
  }

  private static mapMatchedMemberToMembers(matchedElements: MatchedMember[]): Member[] {
    return matchedElements.map(({ name, id, matchedId }) => ({
      name,
      id,
      matchedMemberId: matchedId,
    }));
  }

  static matchMembers(members: Member[]): Member[] {
    const inputMatchedElements = MatchingMemberService.mapMembersToMatchedElements(members);
    const matchedMembers = MatchingService.matchElements<MatchedMember>(inputMatchedElements);

    return MatchingMemberService.mapMatchedMemberToMembers(matchedMembers);
  }
}

export default MatchingMemberService;
