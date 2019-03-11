export enum RoleType {
  ORGANISER = 'ORGANISER',
  PARTICIPANT = 'PARTICIPANT',
}

export interface IEventMemberRole {
  type: RoleType;
  abilityToRandom?: boolean;
  matchedMemberId?: string;
}
