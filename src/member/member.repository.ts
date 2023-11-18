import { MemberRecord } from './member.interface';

export interface MemberRepository {
  findByIds(ids: string[]): Promise<MemberRecord[]>;
  addList(drawLinks: MemberRecord[]): Promise<MemberRecord[]>;
}
