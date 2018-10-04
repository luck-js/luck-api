import {MatchingService} from './matching.service';
import {MemberRepository} from './member.repository';
import {IMember} from './member.model';

export class Member implements IMember {
    id: string = 'tes2';
    name: string;
    uniqueLink: string;
    matchedMemberId: string;

    constructor(private memberRepository: MemberRepository,
                private matchingService: MatchingService) {

    }

    matchMember() {
        this.matchedMemberId = this.matchingService.randomObject(this.id, this.memberRepository.getList());
        this.memberRepository.updateMatchedMemberId(this.id, this.matchedMemberId)
    }
}