import { MemberRecord } from './member.interface';

export interface MemberRepository {
  addList(drawLinks: MemberRecord[]): Promise<MemberRecord[]>;
}
