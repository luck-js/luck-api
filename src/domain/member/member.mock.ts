/*
 *   generate by https://www.json-generator.com/#
 */
/*
 *   generate by https://www.json-generator.com/#
 */

import { IMember } from './member.model';
import { RoleType } from './event-member-role/event-member-role.model';

export const ORGANISER_INITIAL_MOCK: IMember = {
  id: '0',
  name: 'Janet',
  eventMemberRole: {
    type: RoleType.ORGANISER,
    matchedMemberId: null,
    abilityToRandom: false,
  },
};

export const PARTICIPANT_INITIAL_LIST_MOCK: IMember[] = [
  {
    id: '1',
    name: 'Kline',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: null,
      abilityToRandom: true,
    },
  },
  {
    id: '2',
    name: 'Le',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: null,
      abilityToRandom: true,
    },
  },
  {
    id: '3',
    name: 'Barlow',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: null,
      abilityToRandom: true,
    },
  },
  {
    id: '4',
    name: 'Jean',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: null,
      abilityToRandom: true,
    },
  },
  {
    id: '5',
    name: 'Sheila',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: null,
      abilityToRandom: true,
    },
  },
  {
    id: '11',
    name: 'Jean 11',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: '22',
      abilityToRandom: true,
    },
  },
  {
    id: '22',
    name: 'Sheila 22',
    eventMemberRole: {
      type: RoleType.PARTICIPANT,
      matchedMemberId: '11',
      abilityToRandom: true,
    },
  },
];

export const MEMBER_INITIAL_LIST_MOCK = [ORGANISER_INITIAL_MOCK, ...PARTICIPANT_INITIAL_LIST_MOCK];
