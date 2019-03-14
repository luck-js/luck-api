import * as assert from 'assert';
import IDENTIFIER from '../infrastructure/identifiers';
import { DIContainer } from '../infrastructure/di-container';
import { MEMBER_INITIAL_LIST_MOCK } from './member/member.mock';
import { MemberFactory } from './member/member.factory';
import { MatchingMemberService } from './matching-member.service';
import { Member } from './member/member';

describe('Matching Member Service', function() {
  let members: Member[];
  let newMemberList: Member[];

  describe("Testing member list when organiser isn't ability to random", function() {
    before(function() {
      const matchingMemberService = DIContainer.get<MatchingMemberService>(
        IDENTIFIER.MatchingMemberService,
      );
      const memberFactory = DIContainer.get<MemberFactory>(IDENTIFIER.MemberFactory);
      members = MEMBER_INITIAL_LIST_MOCK.map(member => memberFactory.recreate(member));
      newMemberList = matchingMemberService.matchMembers(members);
    });

    it('Every member has random matched member', function() {
      MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).forEach(member => {
        assert.strictEqual(true, typeof member.MatchedMemberId === 'string');
      });
    });

    it('Matched member has another id', function() {
      MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).forEach(member => {
        assert.strictEqual(true, member.id !== member.MatchedMemberId);
      });
    });

    it('Every matched is unique', function() {
      MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).reduce(
        (previousState, member) => {
          const isUnique = !previousState.some(
            matchedMemberId => matchedMemberId === member.MatchedMemberId,
          );
          assert.strictEqual(true, isUnique);
          previousState.push(member.MatchedMemberId);
          return previousState;
        },
        [],
      );
    });
  });
});
