import { Member, NewMember } from '../member/member.interface';

export interface HappeningRecord {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  createdAt: string;
}

export interface Happening {
  id: string;
  name: string;
  description: string;
  members: Member[];
  createdAt: string;
}

export interface NewHappening {
  name: string;
  description: string;
  members: NewMember[];
}
