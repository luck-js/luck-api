import 'mocha';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {Happening} from '../happening/happening';
import {MemberRepository} from '../member/member.repository';
import {MatchingMemberService} from '../member/matching-member.service';
import {MEMBER_INITIAL_LIST_MOCK} from '../member/member.mock';
import {MemberFactory} from '../member/member.factory';
import {UuidGenerationService} from '../member/uuid-generation.service';
import {RelationMemberHappeningRepository} from '../relation-member-happening/relation-member-happening.repository';
import {RelationMemberHappeningFactory} from '../relation-member-happening/relation-member-happening.factory';
import {HappeningFactory} from '../happening/happening.factory';
import {HappeningRepository} from '../happening/happening.repository';
import {RelationMemberHappeningApi} from '../relation-member-happening/relation-member-happening.api';
import {RelationMemberHappeningService} from '../relation-member-happening/relation-member-happening.service';
import {DIContainerProvider} from '../di-container';
import IDENTIFIER from '../identifiers';
import {IHappening} from '../happening/happening.model';

interface IDependencies {
    happeningFactory: HappeningFactory;
    memberRepository: MemberRepository;
    memberFactory: MemberFactory;
    happeningRepository: HappeningRepository;
    relationMemberHappeningFactory: RelationMemberHappeningFactory;
    relationMemberHappeningRepository: RelationMemberHappeningRepository;
    matchingMemberService: MatchingMemberService;
    uuidGenerationService: UuidGenerationService
}

const initialDependencies = (MEMBER_INITIAL_LIST_MOCK?): IDependencies => {
    const DIContainer = DIContainerProvider(MEMBER_INITIAL_LIST_MOCK);

    const memberRepository = DIContainer.get<MemberRepository>(IDENTIFIER.MemberRepository);
    const memberFactory = new MemberFactory();
    let happeningRepository: HappeningRepository;

    const relationMemberHappeningFactory = new RelationMemberHappeningFactory();
    const relationMemberHappeningRepository = DIContainer.get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);

    const matchingMemberService = new MatchingMemberService();
    const uuidGenerationService = new UuidGenerationService();

    const happeningFactory = new HappeningFactory(
        memberRepository,
        relationMemberHappeningRepository,
        matchingMemberService,
        uuidGenerationService,
        relationMemberHappeningFactory,
        memberFactory,
    );

    happeningRepository = DIContainer.get<(happeningList: IHappening[], happeningFactory: HappeningFactory) => HappeningRepository>(IDENTIFIER.DIFactoryHappeningRepository)([], happeningFactory);

    return {
        happeningFactory,
        memberRepository,
        memberFactory,
        happeningRepository,
        relationMemberHappeningFactory,
        relationMemberHappeningRepository,
        matchingMemberService,
        uuidGenerationService
    }
};

function createHappening(dependencies: IDependencies, {name, description, isPublish}: any): Happening {
    const id = dependencies.happeningFactory.create();
    return dependencies.happeningFactory.recreate({id, name, description, isPublish});
}

describe('Happening', function () {
    let dependencies: IDependencies;
    let happening: Happening;

    beforeEach(function () {
        dependencies = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(dependencies, {name: 'Initial Happening'});
    });

    describe('Creating new happening', function () {

        it('Created happening should be set isPublish to false', function () {
            assert.strictEqual(false, happening.isPublish);
        });

        it('Created happening should be unique id', function () {
            const happeningSecond = createHappening(dependencies, {name: 'Second Happening'});

            assert.notStrictEqual(happeningSecond.id, happening.id)
        });
    });
});

describe('Members of happening', function () {
    let dependencies: IDependencies;
    let happening: Happening;

    beforeEach(function () {
        dependencies = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(dependencies, {name: 'Initial Happening'});
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
            newMemberList = dependencies.matchingMemberService.randomMembers(MEMBER_INITIAL_LIST_MOCK);
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
    let dependencies: IDependencies;
    let happening: Happening;

    beforeEach(function () {
        dependencies = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        happening = createHappening(dependencies, {name: 'Initial Happening'});
    });

    describe('Created relation after add member', function () {

        it('Relation should be created member of happening to happening', function () {
            const billMember = happening.addMember('Bill');
            const relation = dependencies.relationMemberHappeningRepository.get(billMember.relationId);

            assert.strictEqual(billMember.id, relation.memberId);
        });
    });
});

describe('Member API', function () {
    let dependencies: IDependencies;
    let happening: Happening;

    let memberApi;

    beforeEach(function () {
        dependencies = initialDependencies();
        happening = createHappening(dependencies, {name: 'Initial Happening'});

        memberApi = new RelationMemberHappeningApi(new RelationMemberHappeningService(
            dependencies.relationMemberHappeningRepository,
            dependencies.memberRepository,
            dependencies.happeningRepository
        ));
    });

    describe('Get data of member information view', function () {

        it('Data should has correctly member and happening name', function () {
            const HAPPENING_NAME = 'initialHappening';
            const MEMBER_NAME = 'Bill';

            happening = createHappening(dependencies, {name: HAPPENING_NAME});
            dependencies.happeningRepository.add(happening);

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

            happening = createHappening(dependencies, {name: HAPPENING_NAME});
            dependencies.happeningRepository.add(happening);

            const billMember = happening.addMember(MEMBER_NAMES[0]);
            const victorsMember = happening.addMember(MEMBER_NAMES[1]);
            happening.publishEvent();

            const matchedMember = memberApi.getMatchedMember(billMember.id);

            assert.strictEqual(victorsMember.id, matchedMember.id);
        });
    });

});
