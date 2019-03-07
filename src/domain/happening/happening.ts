import { Member } from '../member/member';
import { IHappeningMetadata } from './happening.model';

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

  public updateMembers(members: Member[]): Member[] {
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
