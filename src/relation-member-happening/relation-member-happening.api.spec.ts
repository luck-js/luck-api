import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { Happening } from '../happening/happening';
import { RelationMemberHappeningApi } from './relation-member-happening.api';
import { RelationMemberHappeningService } from './relation-member-happening.service';

describe('Relation Member Happening Api', function () {
    const HAPPENING_NAME = 'initialHappening';
    let relationId: string;
    let DIContainer: Container;
    let happening: Happening;
    let relationMemberHappeningService: RelationMemberHappeningService;
    let memberApi: RelationMemberHappeningApi;

    beforeEach(function () {
        DIContainer = initialDependencies();

        relationMemberHappeningService = DIContainer.get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);
        relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
        happening = relationMemberHappeningService.editHappening(relationId, { name: HAPPENING_NAME });

        memberApi = DIContainer.get<RelationMemberHappeningApi>(IDENTIFIER.RelationMemberHappeningApi);
    });

    describe('Get data of member information view', function () {

        it('Data should has correct member and happening name', function () {
            const MEMBER_NAME = 'Bill';

            const billMember = relationMemberHappeningService.addMember(relationId, MEMBER_NAME);

            const memberInformationView = memberApi.getDataView(billMember.relationId);

            assert.strictEqual(billMember.name, memberInformationView.member.name);
            assert.strictEqual(happening.name, memberInformationView.happening.name);
        });
    });

    describe('Get matched member', function () {

        it('Should returned matched member if happening is published', function () {
            const MEMBER_NAMES = ['Bill', 'Victors'];

            const billMember = relationMemberHappeningService.addMember(relationId, MEMBER_NAMES[0]);
            const victorsMember = relationMemberHappeningService.addMember(relationId, MEMBER_NAMES[1]);
            happening.publishEvent();
            const matchedMember = memberApi.getMatchedMember(billMember.relationId);

            assert.strictEqual(victorsMember.id, matchedMember.id);
        });
    });

});
