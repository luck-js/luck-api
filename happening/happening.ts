import {IHappening} from './happening.model';
import {MemberRepository} from '../member/member.repository';
import {IMember} from '../member/member.model';
import {MatchingMemberService} from '../member/matchingMemberService';

export class Happening implements IHappening {
    private id: string = 'test123';

    public isPublish = false;

    constructor(private memberRepository: MemberRepository,
                private matchingMemberService: MatchingMemberService) {

    }

    public addMember(name: string): IMember {
        if(this.isPublish){
            throw new Error('Happening is publishing')
        }

        return this.memberRepository.add(this.id, name);
    }

    public getMembers(): IMember[] {
        if (this.isPublish) {
            return this.memberRepository.getList();

        } else {
            return this.memberRepository.getList()
                .reduce((memberList, member) => {
                    // @ts-ignore
                    memberList.push(Object.assign({}, member, {matchedMemberId: null}));
                    return memberList
                },[]);
        }
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