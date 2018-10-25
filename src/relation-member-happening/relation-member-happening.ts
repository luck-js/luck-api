import { injectable } from 'inversify';
import { HappeningRepository } from '../happening/happening.repository';
import { MemberRepository } from '../member/member.repository';
import { Member } from '../member/member';
import { Happening } from '../happening/happening';
import { IRelationMemberHappening } from './relation-member-happening.model';

@injectable()
export class RelationMemberHappening implements IRelationMemberHappening {
    constructor(public id: string,
                public memberId: string,
                public happeningId: string,
                private memberRepository: MemberRepository,
                private happeningRepository: HappeningRepository) {

    }

    public get Id() {
        return this.id;
    }

    public getMember(): Member {
        return this.memberRepository.getByIndex(this.memberId);
    }

    public getHappening(): Promise<Happening> {
        return this.happeningRepository.getByIndex(this.happeningId);
    }
}
