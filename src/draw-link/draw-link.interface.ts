import { Happening } from '../happening/happening.interface';
import { Member } from '../member/member.interface';

export interface DrawLinkRecord {
  id: string;
  happeningId: string;
  memberId: string;
}

export interface DrawLink {
  id: string;
  happening: Happening;
  member: Member;
}

export interface NewDrawLink {
  happening: Happening;
  member: Member;
}
