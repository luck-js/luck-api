import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainer } from './application.container';
import { UpdateHappeningMetadata } from './update-happening-metadata';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';

describe('UpdateHappeningMetadata', function() {
  let updateHappeningMetadata: UpdateHappeningMetadata;

  beforeEach(function() {
    updateHappeningMetadata = ApplicationContainer.get<UpdateHappeningMetadata>(
      IDENTIFIER.UpdateHappeningMetadata,
    );
  });

  it('executed method not should any error', function(done) {
    const memberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0];
    const happening = HAPPENING_INITIAL_LIST_MOCK.find(
      happening => happening.id === memberParticipation.happeningId,
    );
    const newDescription = 'newDescription';
    const newName = 'newName';

    updateHappeningMetadata
      .execute(memberParticipation.id, { name: newName, description: newDescription })
      .subscribe(happeningMetadata => {
        assert.notStrictEqual(happeningMetadata.name, happening.name);
        assert.strictEqual(happeningMetadata.description, newDescription);
        assert.strictEqual(happeningMetadata.isPublish, happening.isPublish);
        assert.strictEqual(happeningMetadata.id, happening.id);
        assert.notStrictEqual(happeningMetadata.description, happening.description);
        assert.strictEqual(happeningMetadata.name, newName);
        done();
      });
  });
});
