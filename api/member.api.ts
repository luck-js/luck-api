import {MemberService} from './member.service';

export class MemberApi {
    constructor(private memberService: MemberService){}

    public getDataView(id: string){
        return this.memberService.getDataView(id);
    }

    public getMatchedMember(id: string){
        return this.memberService.getMatchedMember(id);
    }
}