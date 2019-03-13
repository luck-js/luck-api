import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainer } from './application.container';
import { PublishHappening } from './publish-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';

describe('PublishHappening', function() {
  let publishHappening: PublishHappening;

  beforeEach(function() {
    publishHappening = ApplicationContainer.get<PublishHappening>(IDENTIFIER.PublishHappening);
  });

  it('executed method not should any error', function(done) {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    publishHappening.execute(memberParticipationId).subscribe(() => done());
  });

  it('executed method should error by called publish happening event', function(done) {
    const memberParticipationPublished = MEMBER_PARTICIPATIONS_INITIAL_MOCK.find(
      memberParticipation => memberParticipation.id === '45d3247e-ffff-4af9-b481-7f578fe7cb9f',
    );
    publishHappening.execute(memberParticipationPublished.id).subscribe(
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
});
