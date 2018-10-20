import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { IMember } from '../member/member.model';
import { MatchingService } from '../services/matching.service';
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
        private memberRepository: MemberRepository,
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private matchingService: MatchingService,
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

    public getMember(id: string): IMember {
        return this.memberRepository.getByIndex(id);
    }

    public getMemberList(): IMember[] {
        return this.memberRepository.getList();
    }

    public publishEvent() {
        this.isPublish = true;
        this.matchMember();
    }

    private matchMember() {
        const memberList = this.memberRepository.getList();
        const newMemberList = this.matchingService.randomElements(memberList);
        this.memberRepository.updateList(newMemberList)

    }
}
