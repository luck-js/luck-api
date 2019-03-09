import { Member } from '../member/member';
import { IHappeningMetadata } from './happening.model';
import { RoleType } from '../member/event-member-role/event-member-role.model';

export class Happening {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public isPublish: boolean = false,
    public members: Member[] = [],
  ) {}

  public addMember(member: Member): Member {
    if (this.isPublish) {
      throw new Error('Happening is publishing');
    }

    this.members.push(member);
    return member;
  }

  public getMember(id: string): Member {
    return this.members.find(member => member.id === id);
  }

  public getMembers(): Member[] {
    return this.members;
  }

  public getParticipants(): Member[] {
    return this.members.filter(member => member.eventMemberRole.type !== RoleType.ORGANISER);
  }

  public getMatchedMember(matchedMemberId: string): Member {
    if (!this.isPublish) {
      throw new Error("Happening isn't publishing");
    }

    return this.members.find(member => matchedMemberId === member.id);
  }

  public updateMembers(members: Member[]): Member[] {
    if (this.isPublish) {
      throw new Error('Happening is publishing');
    }

    this.members = members;
    return this.members;
  }

  public publishEvent(): void {
    this.isPublish = true;
  }

  public updateMetadata(happeningMetadata: IHappeningMetadata): void {
    const { name, description } = happeningMetadata;
    this.name = name;
    this.description = description;
  }
}
