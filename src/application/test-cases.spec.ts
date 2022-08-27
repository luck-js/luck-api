import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import { AddParticipantMember } from './add-participant-member';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { DIContainer } from '../infrastructure/di-container';
import { GetPublishedHappening } from './get-published-happening';

describe('Test Cases', function() {
  let addParticipantMember: AddParticipantMember;
  let getPublishedHappening: GetPublishedHappening;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    addParticipantMember = DIContainer.get<AddParticipantMember>(IDENTIFIER.AddParticipantMember);
    getPublishedHappening = DIContainer.get<GetPublishedHappening>(
      IDENTIFIER.GetPublishedHappening,
    );
  });

  it('Add new participants and check state by get publishedHappeningView', async function() {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    const newOneParticipantMemberName = 'addedOneParticipantMember';
    const addedOneParticipantMember = await addParticipantMember.execute(
      memberParticipationId,
      newOneParticipantMemberName,
    );

    const newSecondParticipantMemberName = 'addedSecondParticipantMember';
    const addedSecondParticipantMember = await addParticipantMember.execute(
      memberParticipationId,
      newSecondParticipantMemberName,
    );

    const addedParticipantMembers = [addedOneParticipantMember, addedSecondParticipantMember];

    const publishedHappeningView = await getPublishedHappening.execute(memberParticipationId);

    assert.ok(
      addedParticipantMembers.some(addedParticipantMember =>
        publishedHappeningView.participants.some(
          participant => participant.name === addedParticipantMember.name,
        ),
      ),
    );
  });
});
