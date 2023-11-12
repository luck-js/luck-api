import { Member } from './member.interface';

export interface MemberRepository {
  getAll(): Promise<Member[]>;
}
