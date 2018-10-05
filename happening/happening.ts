import {IHappening} from './happening.model';
import {MemberRepository} from '../member/member.repository';
import {IMember} from '../member/member.model';
import {MatchingMemberService} from '../member/matching-member.service';

export class Happening implements IHappening {
    private id: string = 'test123';

    public isPublish = false;

    constructor(private memberRepository: MemberRepository,
                private matchingMemberService: MatchingMemberService) {

    }

    public addMember(name: string): IMember {
        if (this.isPublish) {
            throw new Error('Happening is publishing')
        }

        return this.memberRepository.add(this.id, name);
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