import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { UpdateHappeningMetadata } from './update-happening-metadata';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../domain/member-participation/member-participation.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../domain/happening/happening.mock';
import { DIContainer } from '../infrastructure/di-container';

describe('UpdateHappeningMetadata', function() {
  let updateHappeningMetadata: UpdateHappeningMetadata;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    updateHappeningMetadata = DIContainer.get<UpdateHappeningMetadata>(
      IDENTIFIER.UpdateHappeningMetadata,
    );
  });

  it('executed method should returned modified happening value', function(done) {
    const memberParticipation = MEMBER_PARTICIPATIONS_INITIAL_MOCK[0];
    const happening = HAPPENING_INITIAL_LIST_MOCK.find(
      happening => happening.id === memberParticipation.happeningId,
    );
    const newDescription = 'newDescription';
    const newName = 'newName';

    updateHappeningMetadata
      .execute(memberParticipation.id, { name: newName, description: newDescription })
      .subscribe(happeningView => {
        assert.notStrictEqual(happeningView.name, happening.name);
        assert.strictEqual(happeningView.description, newDescription);
        assert.strictEqual(happeningView.isPublish, happening.isPublish);
        assert.strictEqual(happeningView.id, happening.id);
        assert.notStrictEqual(happeningView.description, happening.description);
        assert.strictEqual(happeningView.name, newName);
        done();
      });
  });
});
