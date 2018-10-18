import * as assert from 'assert';
import {Container} from 'inversify';
import IDENTIFIER from '../identifiers';
import {createHappening, initialDependencies} from '../test/test.spec';
import {Happening} from '../happening/happening';
import {HappeningRepository} from '../happening/happening.repository';
import {RelationMemberHappeningApi} from './relation-member-happening.api';

describe('Relation Member Happening Api', function () {
    let DIContainer: Container;
    let happening: Happening;
    let happeningRepository: HappeningRepository;
    let memberApi: RelationMemberHappeningApi;

    beforeEach(function () {
        DIContainer = initialDependencies();
        happening = createHappening(DIContainer, {name: 'Initial Happening'});

        happeningRepository = DIContainer.get<HappeningRepository>(IDENTIFIER.HappeningRepository);
        memberApi = DIContainer.get<RelationMemberHappeningApi>(IDENTIFIER.RelationMemberHappeningApi);
    });

    describe('Get data of member information view', function () {

        it('Data should has correctly member and happening name', function () {
            const HAPPENING_NAME = 'initialHappening';
            const MEMBER_NAME = 'Bill';

            happening = createHappening(DIContainer, {name: HAPPENING_NAME});
            happeningRepository.add(happening);

            const billMember = happening.addMember(MEMBER_NAME);

            const memberInformationView = memberApi.getDataView(billMember.relationId);

            assert.strictEqual(billMember.name, memberInformationView.member.name);
            assert.strictEqual(happening.name, memberInformationView.happening.name);
        });
    });

    describe('Get matched member', function () {

        it('Should returned matched member if happening is published', function () {
            const HAPPENING_NAME = 'initialHappening';
            const MEMBER_NAMES = ['Bill', 'Victors'];

            happening = createHappening(DIContainer, {name: HAPPENING_NAME});
            happeningRepository.add(happening);

            const billMember = happening.addMember(MEMBER_NAMES[0]);
            const victorsMember = happening.addMember(MEMBER_NAMES[1]);
            happening.publishEvent();

            const matchedMember = memberApi.getMatchedMember(billMember.id);

            assert.strictEqual(victorsMember.id, matchedMember.id);
        });
    });

});
