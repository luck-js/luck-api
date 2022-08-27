import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { GetPublishedHappening } from './get-published-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { MEMBER_INITIAL_LIST_MOCK } from '../domain/member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('GetPublishedHappening', function() {
  let getPublishedHappening: GetPublishedHappening;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    getPublishedHappening = DIContainer.get<GetPublishedHappening>(
      IDENTIFIER.GetPublishedHappening,
    );
  });

  it('executed method return memberParticipation view value object', async function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;

    const happeningName = HAPPENING_INITIAL_LIST_MOCK[0].name;
    const happeningDescription = HAPPENING_INITIAL_LIST_MOCK[0].description;

    const publishedHappeningView = await getPublishedHappening.execute(memberParticipationId);
    assert.strictEqual(publishedHappeningView.name, happeningName);
    assert.strictEqual(publishedHappeningView.description, happeningDescription);

    assert.ok(
      publishedHappeningView.participants.some(participant =>
        MEMBER_INITIAL_LIST_MOCK.some(member => member.name === participant.name),
      ),
    );
  });

  it('executed method return members list with unique links', async function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;

    const publishedHappeningView = await getPublishedHappening.execute(memberParticipationId);
    publishedHappeningView.participants.reduce((stateUniqueLinks, participant) => {
      assert.ok(!stateUniqueLinks.some(uniqueLink => uniqueLink === participant.uniqueLink));
      stateUniqueLinks.push(participant.uniqueLink);
      return stateUniqueLinks;
    }, []);
  });
});
