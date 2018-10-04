import {IHappening} from './happening.model';
import {MemberRepository} from '../member/member.repository';
import {IMember} from '../member/member.model';

export class Happening implements IHappening {
    private id: string = 'test123';

    public isPublish = false;

    constructor(private memberRepository: MemberRepository) {

    }

    public addMember(name: string): IMember {
        if(this.isPublish){
            throw new Error('Happening is publishing')
        }

        return this.memberRepository.add(this.id, name);
    }

    getMembers(): IMember[] {
        return this.memberRepository.getList();
    }
}