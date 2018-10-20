import * as assert from 'assert';
import { Container } from 'inversify';
import IDENTIFIER from '../identifiers';
import { initialDependencies } from '../test/test.spec';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { MatchingMemberService } from './matching-member.service';
import { MemberRepository } from '../member/member.repository';


describe('Matching member', function () {
    let DIContainer: Container;
    let memberRepository: MemberRepository;
    let newMemberList;

    before(function () {
        DIContainer = initialDependencies([...MEMBER_INITIAL_LIST_MOCK]);
        memberRepository = DIContainer.get<MemberRepository>(IDENTIFIER.MemberRepository);

        const matchingMemberService = DIContainer.get<MatchingMemberService>(IDENTIFIER.MatchingMemberService);
        newMemberList = matchingMemberService.matchMemberList(memberRepository.getList());
    });

    it('Every member has random matched member', function () {
        newMemberList.forEach((member, index) => {
            assert.strictEqual(true, typeof member.MatchedMemberId === 'string')
        })
    });

    it('Matched member has another id', function () {
        newMemberList.forEach((member, index) => {
            assert.strictEqual(true, member.id !== member.MatchedMemberId)
        })
    });

    it('Every matched is unique', function () {
        newMemberList.reduce((previousState, member) => {
            const isUnique = !previousState.some((matchedMemberId) => matchedMemberId === member.MatchedMemberId);
            assert.strictEqual(true, isUnique);
            previousState.push(member.matchedMemberId);
            return previousState;
        }, [])
    });
});
