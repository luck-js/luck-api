export interface MemberRecord {
  name: string;
  id: string;
  matchedMemberId?: string;
}

export interface NewMember {
  id?: string;
  name: string;
  matchedMemberId?: string;
}

export interface Member {
  name: string;
  id: string;
  matchedMemberId?: string;
}
