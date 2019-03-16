import { IEventMemberRole } from './event-member-role/event-member-role.model';

export interface IMember {
  id: string;
  name: string;
  eventMemberRole: IEventMemberRole;
}
