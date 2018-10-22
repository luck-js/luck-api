import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { DIContainerProvider } from '../di-container';
import { RelationMemberHappeningService } from './relation-member-happening.service';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { PARTICIPANT_INITIAL_LIST_MOCK } from '../member/member.mock';
import { MemberRepository } from '../member/member.repository';
import { MatchingMemberService } from '../services/matching-member.service';

describe('Relation Member Happening Service', function () {
    let DIContainer: Container;
    let relationMemberHappeningService: RelationMemberHappeningService;
    let relationMemberHappeningRepository: RelationMemberHappeningRepository;

    beforeEach(function () {
        DIContainer = DIContainerProvider();
        relationMemberHappeningService = DIContainer
            .get<RelationMemberHappeningService>(IDENTIFIER.RelationMemberHappeningService);

        relationMemberHappeningRepository = DIContainer
            .get<RelationMemberHappeningRepository>(IDENTIFIER.RelationMemberHappeningRepository);
    });

    describe('Creating new happening', function () {
        it('New members should be unique for happening', function () {
            const firstRelationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            relationMemberHappeningService.addParticipant(firstRelationId, 'Bill');

            const secondRelationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            relationMemberHappeningService.addParticipant(secondRelationId, 'Amadeus');

            const firstParticipantListUniqueLinkData = relationMemberHappeningService
                .getDetailedParticipantListInformation(firstRelationId);

            const secondParticipantListUniqueLinkData = relationMemberHappeningService
                .getDetailedParticipantListInformation(secondRelationId);

            assert.strictEqual(firstParticipantListUniqueLinkData.length, 1);
            assert.strictEqual(secondParticipantListUniqueLinkData.length, 1);
        });

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
    });

    describe('Get data of member information view', function () {

        it('Data should has correct member and happening name', function () {
            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const MEMBER_NAME = 'Bill';
            const HAPPENING_NAME = 'Happening Initial';

            relationMemberHappeningService.editHappening(relationId, { name: HAPPENING_NAME });
            const billParticipant = relationMemberHappeningService.addParticipant(relationId, MEMBER_NAME);

            const memberInformationView = relationMemberHappeningService.getDataView(billParticipant.relationId);

            assert.strictEqual(MEMBER_NAME, memberInformationView.member.name);
            assert.strictEqual(HAPPENING_NAME, memberInformationView.happening.name);
        });
    });

    describe('Getter of IParticipantUniqueLinkData', function () {
        it('Returned list should be less by 1 member by ORGANISER', function () {
            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const relation = relationMemberHappeningRepository.get(relationId);
            const happening = relation.getHappening();

            PARTICIPANT_INITIAL_LIST_MOCK
                .map(({ name }) => relationMemberHappeningService.addParticipant(relationId, name));

            const participantUniqueLinkData = relationMemberHappeningService.getDetailedParticipantListInformation(relationId);

            assert.strictEqual(participantUniqueLinkData.length, happening.getMemberList().length - 1);
        })
    });


    describe('Get matched member', function () {

        it('Should returned matched member if happening is published', function () {
            const memberRepository: MemberRepository = DIContainer
                .get<MemberRepository>(IDENTIFIER.MemberRepository);

            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const relation = relationMemberHappeningRepository.get(relationId);
            const happening = relation.getHappening();

            const memberInstanceList = PARTICIPANT_INITIAL_LIST_MOCK
                .map(({ name }) => relationMemberHappeningService.addParticipant(relationId, name));

            let participant = memberInstanceList[0];

            happening.publishEvent();
            const matchedMember = relationMemberHappeningService.getMatchedMember(participant.relationId);
            participant = memberRepository.getByIndex(participant.id);

            assert.strictEqual(participant.eventMemberRole.MatchedMemberId, matchedMember.id);
        });

        it('Matched member should be from list of happening', function () {
            const FIRST_PARTICIPANT_INITIAL_LIST_MOCK = [
                PARTICIPANT_INITIAL_LIST_MOCK[0],
                PARTICIPANT_INITIAL_LIST_MOCK[1]
            ];

            const SECOND_PARTICIPANT_INITIAL_LIST_MOCK = [
                PARTICIPANT_INITIAL_LIST_MOCK[2],
                PARTICIPANT_INITIAL_LIST_MOCK[3],
                PARTICIPANT_INITIAL_LIST_MOCK[4]];

            const firstRelationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const firstMemberInstanceList = FIRST_PARTICIPANT_INITIAL_LIST_MOCK
                .map(({ name }) => relationMemberHappeningService.addParticipant(firstRelationId, name));

            const secondRelationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const secondMemberInstanceList = SECOND_PARTICIPANT_INITIAL_LIST_MOCK
                .map(({ name }) => relationMemberHappeningService.addParticipant(secondRelationId, name));

            relationMemberHappeningService.publish(firstRelationId);

            const firstRelation = relationMemberHappeningRepository.get(firstRelationId);
            const happening = firstRelation.getHappening();

            const firstMembersListAbleToRandom = MatchingMemberService.filterMembersWhoAbleToRandom(happening.getMemberList());

            assert.strictEqual(true, firstMembersListAbleToRandom
                .some((member) => firstMembersListAbleToRandom
                    .some((el) => el.id === member.MatchedMemberId)));
        });
    });

    describe('Generate detailed participant list information', function () {
        it('Should generated list with the same names', function () {
            const relationId = relationMemberHappeningService.createOwnerRelationOfHappening();
            const MOCK_BODY = {
                'name': 'TEST_NAME',
                'description': 'TEST_DESCRIPTION',
                'participantList': [{ 'name': 'Bill' }, { 'name': 'Johny' }, { 'name': 'Matt' }, { 'name': 'Kathy' }]
            };

            const participantUniqueLinkData = relationMemberHappeningService
                .generateDetailedParticipantListInformation(relationId, MOCK_BODY);

            participantUniqueLinkData
                .map(({ name }) => assert.strictEqual(true, MOCK_BODY.participantList.some((el) => el.name === name)))
        })
    });
})
;
