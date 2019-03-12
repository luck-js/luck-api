import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainer } from './application.container';
import { GetPublishedHappening } from './get-published-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { MEMBER_INITIAL_LIST_MOCK } from '../domain/member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';

describe('GetPublishedHappening', function() {
  let getPublishedHappening: GetPublishedHappening;

  beforeEach(function() {
    getPublishedHappening = ApplicationContainer.get<GetPublishedHappening>(
      IDENTIFIER.GetPublishedHappening,
    );
  });

  it('executed method return memberParticipation view value object', function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;

    const happeningName = HAPPENING_INITIAL_LIST_MOCK[0].name;
    const happeningDescription = HAPPENING_INITIAL_LIST_MOCK[0].description;

    getPublishedHappening.execute(memberParticipationId).subscribe(publishedHappeningView => {
      assert.strictEqual(publishedHappeningView.name, happeningName);
      assert.strictEqual(publishedHappeningView.description, happeningDescription);

      assert.ok(
        publishedHappeningView.participants.some(participant =>
          MEMBER_INITIAL_LIST_MOCK.some(member => member.name === participant.name),
        ),
      );
    });
  });
});
