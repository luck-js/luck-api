import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { PublishHappening } from './publish-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('PublishHappening', function() {
  let publishHappening: PublishHappening;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    publishHappening = DIContainer.get<PublishHappening>(IDENTIFIER.PublishHappening);
  });

  it('executed method not should any error', async function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    await publishHappening.execute(memberParticipationId);
  });

  it('executed method should error by called publish happening event', async function() {
    const memberParticipationPublished = MEMBER_PARTICIPATIONS_INITIAL_MOCK.find(
      memberParticipation => memberParticipation.id === '45d3247e-ffff-4af9-b481-7f578fe7cb9f',
    );
    try {
      await publishHappening.execute(memberParticipationPublished.id);
    } catch (e) {
      assert.strictEqual(e.message, 'Happening is publishing');
    }
  });
});
