import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { RelationMemberHappeningService } from './relation-member-happening.service';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';

describe('Relation Member Happening Service', function () {
    let DIContainer: Container;
    let relationMemberHappeningService: RelationMemberHappeningService;
    let relationMemberHappeningRepository: RelationMemberHappeningRepository;

    beforeEach(function () {
        DIContainer = initialDependencies();
        relationMemberHappeningService = DIContainer
            .get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);

        relationMemberHappeningRepository = DIContainer
            .get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
    });

    describe('Creating new happening', function () {

        it('Created should returned id relation between member and happening', function () {
            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const relation = relationMemberHappeningRepository.get(relationId);

            assert.strictEqual(relation.Id, relationId);
        });
    });

    describe('Publishing', function () {
        it('Should changed state happening after event', function () {
            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();

            relationMemberHappeningService.publish(relationId);
            const happening = relationMemberHappeningRepository.get(relationId).getHappening();

            assert.strictEqual(true, happening.isPublish);
        })
    })
});
