import { EventMemberRole } from './event-member-role/event-member-role';

export interface IMember {
  id: string;
  name: string;
  eventMemberRole: EventMemberRole;
}
