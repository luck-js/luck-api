import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { RelationMemberHappeningService } from './relation-member-happening.service';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';

describe('Relation Member Happening Service', function () {
    let DIContainer: Container;

    beforeEach(function () {
        DIContainer = initialDependencies();
    });

    describe('Creating new happening', function () {

        it('Created should returned id relation between member and happening', function () {
            const relationMemberHappeningService = DIContainer
                .get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);

            const relationMemberHappeningRepository = DIContainer
                .get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);

            const relationId = relationMemberHappeningService.createHappening();
            const relation = relationMemberHappeningRepository.get(relationId);

            assert.strictEqual(relation.Id, relationId);
        });
    });
});
