import { injectable } from 'inversify';
import { HappeningRepository } from '../happening/happening.repository';
import { MemberRepository } from '../member/member.repository';
import { IMember } from '../member/member.model';
import { Happening } from '../happening/happening';

@injectable()
export class RelationMemberHappening {
    constructor(private id: string,
                private memberId: string,
                private happeningId: string,
                private memberRepository: MemberRepository,
                private happeningRepository: HappeningRepository) {

    }

    public getMember(): IMember {
        return this.memberRepository.getByIndex(this.memberId);
    }

    public getHappening(): Happening {
        return this.happeningRepository.getByIndex(this.happeningId);
    }
}
