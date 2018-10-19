import { IHappening } from './happening.model';
import { MemberRepository } from '../member/member.repository';
import { IMember } from '../member/member.model';
import { MatchingMemberService } from '../member/matching-member.service';
import { MemberFactory } from '../member/member.factory';
import { RelationMemberHappeningFactory } from '../relation-member-happening/relation-member-happening.factory';
import { UuidGenerationService } from '../member/uuid-generation.service';
import { RelationMemberHappeningRepository } from '../relation-member-happening/relation-member-happening.repository';

export class Happening implements IHappening {

    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public isPublish: boolean = false,
        private memberRepository: MemberRepository,
        private relationMemberHappeningRepository: RelationMemberHappeningRepository,
        private matchingMemberService: MatchingMemberService,
        private uuidGenerationService: UuidGenerationService,
        private relationMemberHappeningFactory: RelationMemberHappeningFactory,
        private memberFactory: MemberFactory) {

    }

    public addMember(name: string): IMember {
        if (this.isPublish) {
            throw new Error('Happening is publishing')
        }
        const memberId = this.uuidGenerationService.createNewUuid();
        const relationId = this.uuidGenerationService.createNewUuid();
        const relationMemberHappeningArguments = { memberId, id: relationId, happeningId: this.id };

        const member = this.memberFactory.create(relationId, name);
        const relation = this.relationMemberHappeningFactory.create(relationMemberHappeningArguments);

        this.memberRepository.add(member);
        this.relationMemberHappeningRepository.add(relationMemberHappeningArguments);

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
        const newMemberList = this.matchingMemberService.randomMembers(memberList);
        this.memberRepository.updateList(newMemberList)

    }
}
