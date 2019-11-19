import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { DIContainer } from '../infrastructure/di-container';
import { CreateNewPublishedHappening } from './create-new-published-happening';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';

describe('CreateNewPublishedHappening', function() {
  let createNewPublishedHappening: CreateNewPublishedHappening;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    createNewPublishedHappening = DIContainer.get<CreateNewPublishedHappening>(
      IDENTIFIER.CreateNewPublishedHappening,
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

    createNewPublishedHappening
      .execute({
        name: newName,
        description: newDescription,
        participants: participants,
      })
      .subscribe(happeningView => {
        assert.strictEqual(happeningView.name, newName);
        assert.notStrictEqual(happeningView.name, happening.name);
        assert.strictEqual(happeningView.description, newDescription);
        assert.notStrictEqual(happeningView.description, happening.description);
        done();
      });
  });

  it('executed method return members list with unique links', function(done) {
    const newDescription = 'newDescription';
    const newName = 'newName';
    const newOneParticipantMemberName = 'addedOneParticipantMember';
    const newSecondParticipantMemberName = 'addedSecondParticipantMember';

    const participants = [
      { name: newOneParticipantMemberName },
      { name: newSecondParticipantMemberName },
    ];

    createNewPublishedHappening
      .execute({
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
