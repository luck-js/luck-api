import {IHappening} from './happening.model';
import {MemberRepository} from '../member/member.repository';
import {IMember} from '../member/member.model';
import {MatchingMemberService} from '../member/matching-member.service';
import {MemberFactory} from '../member/member.factory';

export class Happening implements IHappening {
    private id: string = 'test123';

    public isPublish = false;

    constructor(private memberRepository: MemberRepository,
                private matchingMemberService: MatchingMemberService,
                private memberFactory: MemberFactory) {

    }

    public addMember(name: string): IMember {
        if (this.isPublish) {
            throw new Error('Happening is publishing')
        }

        const member = this.memberFactory.create(this.id, name);

        return this.memberRepository.add(member);
    }

    public getMembers(): IMember[] {
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