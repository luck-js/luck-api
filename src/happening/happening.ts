import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { MatchingMemberService } from '../services/matching-member.service';
import { MemberFactory } from '../member/member.factory';
import { RelationMemberHappeningFactory } from '../relation-member-happening/relation-member-happening.factory';
import { RelationMemberHappeningRepository } from '../relation-member-happening/relation-member-happening.repository';
import { Member } from '../member/member';
import { RoleType } from '../member/event-member-role/event-member-role.model';

export class Happening implements IHappening {

    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public isPublish: boolean = false,
        public memberIdList: string[] = [],
        private memberRepository: MemberRepository,
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private matchingMemberService: MatchingMemberService,
        private relationMemberHappeningFactory: RelationMemberHappeningFactory,
        private memberFactory: MemberFactory) {

    }

    public addMember(relationId: string, type: RoleType, name?: string): Member {
        if (this.isPublish) {
            throw new Error('Happening is publishing')
        }

        const member = this.memberFactory.create(relationId, type, name);

        this.memberRepository.add(member);
        this.memberIdList.push(member.id);
        return member
    }

    public getMember(id: string): Member {
        return this.memberRepository.getByIndex(id);
    }

    public getMemberList(): Member[] {
        return this.memberIdList.map((id) => this.memberRepository.getByIndex(id));
    }

    public publishEvent() {
        this.isPublish = true;
        this.matchMember();
    }

    private matchMember() {
        const memberList = this.getMemberList();
        const newMemberList = this.matchingMemberService.matchMemberList(memberList);
        this.memberRepository.updateList(newMemberList)

    }
}
