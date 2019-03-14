import { injectable } from 'inversify';
import { Member } from '../member/member';
import { Happening } from '../happening/happening';
import { IHappeningMetadata } from '../happening/happening.model';

@injectable()
export class MemberParticipation {
  constructor(public id: string, public member: Member, public happening: Happening) {}

  getMember(): Member {
    return this.member;
  }

  updateMembers(members: Member[]): Member[] {
    return this.happening.updateMembers(members);
  }

  getMembers(): Member[] {
    return this.happening.getMembers();
  }

  getParticipants(): Member[] {
    return this.happening.getParticipants();
  }

  getMatchedMember(): Member {
    return this.happening.getMatchedMember(this.member.MatchedMemberId);
  }

  getHappening(): Happening {
    return this.happening;
  }

  publishHappening(): void {
    this.happening.publishEvent();
  }

  updateHappeningMetadata(happeningMetadata: IHappeningMetadata): Happening {
    this.happening.updateMetadata(happeningMetadata);
    return this.happening;
  }
}
