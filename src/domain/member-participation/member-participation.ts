import { injectable } from 'inversify';
import { Member } from '../member/member';
import { Happening } from '../happening/happening';
import { IHappeningMetadata } from '../happening/happening.model';

@injectable()
export class MemberParticipation {
  constructor(public id: string, public member: Member, public happening: Happening) {}

  public getMember(): Member {
    return this.member;
  }

  public getMatchedMember(): Member {
    return this.getMembers().find(member => this.member.MatchedMemberId === member.id);
  }

  public updateMembers(members: Member[]): Member[] {
    return this.happening.updateMembers(members);
  }

  public getMembers(): Member[] {
    return this.happening.getMembers();
  }

  public getHappening(): Happening {
    return this.happening;
  }

  public publishHappening(): void {
    this.happening.publishEvent();
  }

  public updateHappeningMetadata(happeningMetadata: IHappeningMetadata): Happening {
    this.happening.updateMetadata(happeningMetadata);
    return this.happening;
  }
}
