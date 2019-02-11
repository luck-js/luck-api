import * as assert from 'assert';
import { Container } from 'inversify';
import { DIContainerProvider } from '../di-container';
import { MEMBER_INITIAL_LIST_MOCK } from './member.mock';
import { RoleType } from './event-member-role/event-member-role.model';
import { MemberFactory } from './member.factory';
import IDENTIFIER from '../identifiers';

describe('Member', function() {
  let DIContainer: Container;
  let memberFactory: MemberFactory;

  beforeEach(function() {
    DIContainer = DIContainerProvider([...MEMBER_INITIAL_LIST_MOCK]);
    memberFactory = DIContainer.get<MemberFactory>(IDENTIFIER.MemberFactory);
  });

  describe('Creating new members', function() {
    it('Added member should be unique relationId ', function() {
      const billParticipant = memberFactory.create(
        'a0a1522b-76d3-467d-9491-d16102216e10',
        RoleType.PARTICIPANT,
      );

      assert.notStrictEqual(billParticipant.relationId, null);
    });

    it('Is able to has modify matchedId of new participant', function() {
      const billParticipant = memberFactory.create(
        'a0a1522b-76d3-467d-9491-d16102216e10',
        RoleType.PARTICIPANT,
      );
      assert.doesNotThrow(
        () => (billParticipant.MatchedMemberId = 'b0a1522b-76d3-467d-9491-d16102216e19'),
      );
    });

    it("Is't able to has modify matchedId of new organiser", function() {
      const billParticipant = memberFactory.create(
        'a0a1522b-76d3-467d-9491-d16102216e10',
        RoleType.ORGANISER,
      );
      assert.throws(
        () => (billParticipant.MatchedMemberId = 'b0a1522b-76d3-467d-9491-d16102216e19'),
      );
    });
  });
});
