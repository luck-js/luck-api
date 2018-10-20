import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { IMember } from '../member/member.model';
import { MemberFactory } from '../member/member.factory';
import { MatchingMemberService } from '../services/matching-member.service';
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

        return member
    }

    public getMember(id: string): Member {
        return this.memberRepository.getByIndex(id);
    }

    public getMemberList(): Member[] {
        return this.memberRepository.getList();
    }

    public publishEvent() {
        this.isPublish = true;
        this.matchingMemberService.matchMemberList();
    }
}
