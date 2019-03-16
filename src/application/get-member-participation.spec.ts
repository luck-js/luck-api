import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { GetMemberParticipation } from './get-member-participation';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { ORGANISER_INITIAL_MOCK } from '../domain/member/member.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('GetMemberParticipation', function() {
  let getMemberParticipation: GetMemberParticipation;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    getMemberParticipation = DIContainer.get<GetMemberParticipation>(
      IDENTIFIER.GetMemberParticipation,
    );
  });

  it('executed method return memberParticipation view value object', function(done) {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;

    const happeningName = HAPPENING_INITIAL_LIST_MOCK[0].name;
    const happeningDescription = HAPPENING_INITIAL_LIST_MOCK[0].description;
    const happeningId = HAPPENING_INITIAL_LIST_MOCK[0].id;

    const memberName = ORGANISER_INITIAL_MOCK.name;
    const memberId = ORGANISER_INITIAL_MOCK.id;

    getMemberParticipation.execute(memberParticipationId).subscribe(memberParticipationView => {
      assert.strictEqual(memberParticipationView.happening.id, happeningId);
      assert.strictEqual(memberParticipationView.happening.description, happeningDescription);
      assert.strictEqual(memberParticipationView.happening.name, happeningName);
      assert.strictEqual(memberParticipationView.happening.isPublish, false);

      assert.strictEqual(memberParticipationView.member.id, memberId);
      assert.strictEqual(memberParticipationView.member.name, memberName);

      done();
    });
  });
});
