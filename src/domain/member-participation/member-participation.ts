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

  public updateMembers(members: Member[]): Member[] {
    return this.happening.updateMembers(members);
  }

  public getMembers(): Member[] {
    return this.happening.getMembers();
  }

  public getParticipants(): Member[] {
    return this.happening.getParticipants();
  }

  public getMatchedMember(): Member {
    return this.happening.getMatchedMember(this.member.MatchedMemberId);
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
