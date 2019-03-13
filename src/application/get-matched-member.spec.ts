import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { GetMatchedMember } from './get-matched-member';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { MEMBER_INITIAL_LIST_MOCK } from '../domain/member/member.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('GetMatchedMember', function() {
  let getMatchedMember: GetMatchedMember;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    getMatchedMember = DIContainer.get<GetMatchedMember>(IDENTIFIER.GetMatchedMember);
  });

  it('getMatchedMember execute in initial happening state should throw error', function(done) {
    const memberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK[1];
    getMatchedMember.execute(memberParticipation.id).subscribe(
      () => {},
      error => {
        assert.throws(() => {
          throw error;
        });
        done();
      },
      () => {
        assert.fail();
        done();
      },
    );
  });

  it('getMatchedMember execute for organiser should throw error even happening is published', function(done) {
    const organiserMemberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK.find(
      memberParticipation => memberParticipation.id === '45d3247e-ffff-4af9-b481-7f578fe7cb9f',
    );
    getMatchedMember.execute(organiserMemberParticipation.id).subscribe(
      () => {},
      error => {
        assert.throws(() => {
          throw error;
        });
        done();
      },
      () => {
        assert.fail();
        done();
      },
    );
  });

  it('getMatchedMember should view value for happening published and participant member', function(done) {
    const participantMemberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK.find(
      memberParticipation => memberParticipation.id === '0d0596af-gggg-4b96-8443-5663d775a79b',
    );
    const me = MEMBER_INITIAL_LIST_MOCK.find(
      member => member.id === participantMemberParticipation.memberId,
    );
    getMatchedMember.execute(participantMemberParticipation.id).subscribe(
      matchedMemberView => {
        assert.strictEqual(matchedMemberView.me.id, me.id);
        assert.strictEqual(typeof matchedMemberView.matchedMember.id, 'string');
      },
      () => {
        assert.fail();
        done();
      },
      () => done(),
    );
  });
});
