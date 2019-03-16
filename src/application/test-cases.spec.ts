import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import { AddParticipantMember } from './add-participant-member';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { DIContainer } from '../infrastructure/di-container';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  it('Add new participants and check state by get publishedHappeningView', function(done) {
    const memberParticipationId = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0].id;
    const newOneParticipantMemberName = 'addedOneParticipantMember';
    const addedOneParticipantMember$ = addParticipantMember.execute(
      memberParticipationId,
      newOneParticipantMemberName,
    );

    const newSecondParticipantMemberName = 'addedSecondParticipantMember';
    const addedSecondParticipantMember$ = addParticipantMember.execute(
      memberParticipationId,
      newSecondParticipantMemberName,
    );

    const addedParticipantMembers$ = combineLatest([
      addedOneParticipantMember$,
      addedSecondParticipantMember$,
    ]);

    const getPublishedHappening$ = getPublishedHappening.execute(memberParticipationId);

    const mergeSource = (addedParticipantMembers$, getPublishedHappening$) => {
      return addedParticipantMembers$.pipe(
        switchMap(addedParticipantMembers =>
          getPublishedHappening$.pipe(
            map(publishedHappeningView => [addedParticipantMembers, publishedHappeningView]),
          ),
        ),
      );
    };

    mergeSource(addedParticipantMembers$, getPublishedHappening$).subscribe(
      ([addedParticipantMembers, publishedHappeningView]) => {
        assert.ok(
          addedParticipantMembers.some(addedParticipantMember =>
            publishedHappeningView.participants.some(
              participant => participant.name === addedParticipantMember.name,
            ),
          ),
        );
        done();
      },
    );
  });
});
