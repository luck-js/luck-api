import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { HappeningRepository } from '../happening/happening.repository';
import { MemberRepository } from '../member/member.repository';
import { Member } from '../member/member';
import { Happening } from '../happening/happening';
import { IRelationMemberHappening } from './relation-member-happening.model';

@injectable()
export class RelationMemberHappening implements IRelationMemberHappening {
  constructor(
    public id: string,
    public memberId: string,
    public happeningId: string,
    private memberRepository: MemberRepository,
    private happeningRepository: HappeningRepository,
  ) {}

  public get Id() {
    return this.id;
  }

  public getMember(): Observable<Member> {
    return of(null);
  }

  public getHappening(): Observable<Happening> {
    return this.happeningRepository.getByIndex(this.happeningId);
  }
}
