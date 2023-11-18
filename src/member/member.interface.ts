export interface MemberRecord {
  name: string;
  id: string;
  matchedMemberId?: string;
}

export interface NewMember extends MemberRecord {
  id?: string;
}

export interface Member extends MemberRecord {}
