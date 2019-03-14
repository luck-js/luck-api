import 'reflect-metadata';
import IDENTIFIER from '../infrastructure/identifiers';
import { CreateMemberParticipation } from './create-member-participation';
import * as assert from 'assert';
import { ApplicationContainerModule } from './application.container-module';
import { DIContainer } from '../infrastructure/di-container';

describe('CreateMemberParticipation', function() {
  let createMemberParticipation: CreateMemberParticipation;

  beforeEach(function() {
    DIContainer.load(ApplicationContainerModule);
    createMemberParticipation = DIContainer.get<CreateMemberParticipation>(
      IDENTIFIER.CreateMemberParticipation,
    );
  });

  it('executed method return memberParticipation view value object', function(done) {
    createMemberParticipation.execute().subscribe(memberParticipationView => {
      assert.strictEqual(typeof memberParticipationView.happening.id, 'string');
      assert.strictEqual(memberParticipationView.happening.description, '');
      assert.strictEqual(memberParticipationView.happening.name, '');
      assert.strictEqual(memberParticipationView.happening.isPublish, false);

      assert.strictEqual(typeof memberParticipationView.member.id, 'string');
      assert.strictEqual(memberParticipationView.member.name, '');

      done();
    });
  });
});