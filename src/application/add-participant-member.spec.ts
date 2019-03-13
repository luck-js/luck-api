import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import { AddParticipantMember } from './add-participant-member';

import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import * as assert from 'assert';
import { ApplicationContainer } from './application.container';

describe('AddParticipantMember', function() {
  let addParticipantMember: AddParticipantMember;

  beforeEach(function() {
    addParticipantMember = ApplicationContainer.get<AddParticipantMember>(
      IDENTIFIER.AddParticipantMember,
    );
  });

  it('executed method return member view value object', function(done) {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    const newParticipantMemberName = 'addedParticipantMember';
    addParticipantMember
      .execute(memberParticipationId, newParticipantMemberName)
      .subscribe(memberView => {
        assert.strictEqual(memberView.name, newParticipantMemberName);
        assert.strictEqual(typeof memberView.id, 'string');

        done();
      });
  });
});
