import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { DIContainer } from '../infrastructure/di-container';
import { CreatePublishedHappening } from './create-published-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';

describe('CreatePublishedHappening', function() {
  let createPublishedHappening: CreatePublishedHappening;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    createPublishedHappening = DIContainer.get<CreatePublishedHappening>(
      IDENTIFIER.CreatePublishedHappening,
    );
  });

  it('executed method should returned modified happening value', function(done) {
    const memberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0];
    const happening = HAPPENING_INITIAL_LIST_MOCK.find(
      happening => happening.id === memberParticipation.happeningId,
    );
    const newDescription = 'newDescription';
    const newName = 'newName';
    const newOneParticipantMemberName = 'addedOneParticipantMember';
    const newSecondParticipantMemberName = 'addedSecondParticipantMember';

    const participants = [
      { name: newOneParticipantMemberName },
      { name: newSecondParticipantMemberName },
    ];

    createPublishedHappening
      .execute(memberParticipation.id, {
        name: newName,
        description: newDescription,
        participants: participants,
      })
      .subscribe(happeningView => {
        assert.notStrictEqual(happeningView.name, happening.name);
        assert.strictEqual(happeningView.description, newDescription);
        assert.notStrictEqual(happeningView.description, happening.description);
        assert.strictEqual(happeningView.name, newName);
        done();
      });
  });

  it('executed method return members list with unique links', function(done) {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    const newDescription = 'newDescription';
    const newName = 'newName';
    const newOneParticipantMemberName = 'addedOneParticipantMember';
    const newSecondParticipantMemberName = 'addedSecondParticipantMember';

    const participants = [
      { name: newOneParticipantMemberName },
      { name: newSecondParticipantMemberName },
    ];

    createPublishedHappening
      .execute(memberParticipationId, {
        name: newName,
        description: newDescription,
        participants: participants,
      })
      .subscribe(publishedHappeningView => {
        publishedHappeningView.participants.reduce((stateUniqueLinks, participant) => {
          assert.ok(!stateUniqueLinks.some(uniqueLink => uniqueLink === participant.uniqueLink));
          stateUniqueLinks.push(participant.uniqueLink);
          return stateUniqueLinks;
        }, []);
        done();
      });
  });
});
