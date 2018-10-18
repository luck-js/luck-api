import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Container} from 'inversify';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matching-member.service';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {RelationMemberHappeningRepository} from '../relation-member-happening/relation-member-happening.repository';
import {HappeningFactory} from '../happening/happening.factory';
import {HappeningRepository} from '../happening/happening.repository';
import {RelationMemberHappeningApi} from '../relation-member-happening/relation-member-happening.api';
import {RelationMemberHappeningService} from '../relation-member-happening/relation-member-happening.service';
import {DIContainerProvider} from '../di-container';
import IDENTIFIER from '../identifiers';

const initialDependencies = (MEMBER_INITIAL_LIST_MOCK?, HAPPENING_INITIAL_LIST_MOCK?): Container => {
    return DIContainerProvider(MEMBER_INITIAL_LIST_MOCK, HAPPENING_INITIAL_LIST_MOCK);
};

function createHappening(DIContainer: Container, {name, description, isPublish}: any): Happening {
    const happeningFactory = DIContainer.get<HappeningFactory>(IDENTIFIER.HappeningFactory);
    const id = happeningFactory.create();
    return happeningFactory.recreate({id, name, description, isPublish});
}

describe('Happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Creating new happening', function () {

        it('Created happening should be set isPublish to false', function () {
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function () {
            const happeningSecond = createHappening(DIContainer, {name: 'Second Happening'});

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });
});

describe('Members of happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Creating new members', function () {
        it('Added member should be unique link ', function () {
            const billMember = happening.addMember('Bill');

            assert.notStrictEqual(billMember.uniqueLink, null);
        });

        it('Publishing happening should be closed on adding new members', function () {
            happening.isPublish = true;

            assert.throws(() => happening.addMember('Bill'))
        });
    });

    describe('Publish happening event', function () {
        it('members shoudnt has matched when happening wasnt publishing', function () {
            happening.getMembers().forEach((member, index) => {
                assert.strictEqual(false, typeof member.matchedMemberId === 'string')
            })
        });

        it('publishing should matched members', function () {
            happening.publishEvent();

            happening.getMembers().forEach((member, index) => {
                assert.strictEqual(true, typeof member.matchedMemberId === 'string')
            })
        });
    });

    describe('Matching member', function () {
        let newMemberList;

        before(function () {
            const matchingMemberService = DIContainer.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
            newMemberList = matchingMemberService.randomMembers(MEMBER_INITIAL_LIST_MOCK);
        });

        it('Every member has random matched member', function () {
            newMemberList.forEach((member, index) => {
                assert.strictEqual(true, typeof member.matchedMemberId === 'string')
            })
        });

        it('Matched member has another id', function () {
            newMemberList.forEach((member, index) => {
                assert.strictEqual(true, member.id !== member.matchedMemberId)
            })
        });

        it('Every matched is unique', function () {
            newMemberList.reduce((previousState, member) => {
                const isUnique = !previousState.some((matchedMemberId) => matchedMemberId === member.matchedMemberId);
                assert.strictEqual(true, isUnique);
                previousState.push(member.matchedMemberId);
                return previousState;
            }, [])
        });
    })
});

describe('Relation member happening', function () {
    let DIContainer: Container;
    let happening: Happening;

    beforeEach(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(DIContainer, {name: 'Initial Happening'});
    });

    describe('Created relation after add member', function () {

        it('Relation should be created member of happening to happening', function () {
            const relationMemberHappeningRepository = DIContainer.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);

            const billMember = happening.addMember('Bill');
            const relation = relationMemberHappeningRepository.get(billMember.relationId);

            assert.strictEqual(billMember.id, relation.memberId);
        });
    });
});

describe('Member API', function () {
    let DIContainer: Container;
    let happening: Happening;
    let relationMemberHappeningRepository: RelationMemberHappeningRepository;
    let memberRepository: MemberRepository;
    let happeningRepository: HappeningRepository;
    let relationMemberHappeningService: RelationMemberHappeningService;
    let memberApi;

    beforeEach(function () {
        DIContainer = initialDependencies();
        happening = createHappening(DIContainer, {name: 'Initial Happening'});

        relationMemberHappeningRepository = DIContainer.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
        memberRepository = DIContainer.get<MemberRepository>(IDENTIFIER.MemberRepository);
        happeningRepository = DIContainer.get<HappeningRepository>(IDENTIFIER.HappeningRepository);
        relationMemberHappeningService = DIContainer.get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);

        memberApi = new RelationMemberHappeningApi(relationMemberHappeningService);
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
