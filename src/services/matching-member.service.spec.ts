import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { MatchingMemberService } from './matching-member.service';
import { MemberRepository } from '../member/member.repository';
import { Member } from '../member/member';


describe('Matching Member Service', function () {
    let DIContainer: Container;
    let memberRepository: MemberRepository;
    let newMemberList: Member[];

    describe('Testing member list when organiser isn\'t ability to random', function () {

        before(function () {
            DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
            memberRepository = DIContainer.get<MemberRepository>(IDENTIFIER.MemberRepository);

            const matchingMemberService = DIContainer.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
            newMemberList = matchingMemberService.matchMemberList(memberRepository.getList());
        });

        it('Every member has random matched member', function () {
            MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).forEach((member, index) => {
                assert.strictEqual(true, typeof member.MatchedMemberId === 'string')
            })
        });

        it('Matched member has another id', function () {
            MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).forEach((member, index) => {
                assert.strictEqual(true, member.id !== member.MatchedMemberId)
            })
        });

        it('Every matched is unique', function () {
            MatchingMemberService.filterMembersWhoAbleToRandom(newMemberList).reduce((previousState, member) => {
                const isUnique = !previousState.some((matchedMemberId) => matchedMemberId === member.MatchedMemberId);
                assert.strictEqual(true, isUnique);
                previousState.push(member.MatchedMemberId);
                return previousState;
            }, [])
        });
    })
});
