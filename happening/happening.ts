import {IHappening} from './happening.model';
import {MemberRepository} from '../member/member.repository';
import {IMember} from '../member/member.model';

export class Happening implements IHappening {
    private id: string = 'test123';

    public isPublish = false;

    constructor(private memberRepository: MemberRepository) {

    }

    public addMember(name: string): IMember {
        return this.memberRepository.add(this.id, name);
    }

    getMembers(): IMember[] {
        return this.memberRepository.getList();
    }
}