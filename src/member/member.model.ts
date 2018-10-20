import { EventMemberRole } from './event-member-role/event-member-role';

export interface IMember {
    id: string,
    relationId: string,
    name: string,
    uniqueLink: string,
    eventMemberRole: EventMemberRole
}
