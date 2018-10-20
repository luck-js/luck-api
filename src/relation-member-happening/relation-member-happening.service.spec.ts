import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { RelationMemberHappeningService } from './relation-member-happening.service';
import { RelationMemberHappeningRepository } from './relation-member-happening.repository';
import { PARTICIPANT_INITIAL_LIST_MOCK } from '../member/member.mock';
import { MemberRepository } from '../member/member.repository';

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
    });
});
