import {MemberService} from './member.service';

export class MemberApi {
    constructor(private memberService: MemberService){}

    public getMemberInformationView(id: string){
        return this.memberService.getMemberInformationView(id);
    }

    public getMatchedMember(id: string){
        return this.memberService.getMatchedMember(id);
    }
}