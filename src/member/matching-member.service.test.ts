import { Member } from './member.interface';
import MatchingMemberService from './matching-member.service';

describe('Matching Member Service', () => {
  describe('when member list is empty', () => {
    const members: Member[] = [];

    expect(() => MatchingMemberService.matchMembers(members)).toThrowError(
      'Not enough elements to match',
    );
  });

  describe('when member list has only one member', () => {
    const members: Member[] = [
      {
        id: '1',
        name: 'John',
      },
    ];

    it('should have one member with no matched member', () => {
      expect(() => MatchingMemberService.matchMembers(members)).toThrowError(
        'Not enough elements to match',
      );
    });
  });

  describe('when member list has an odd number of members', () => {
    const members: Member[] = [
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Charlie',
      },
    ];

    const matchedMembers = MatchingMemberService.matchMembers(members);

    it('should have every member matched with another member', () => {
      expect(matchedMembers.every((member) => member.matchedMemberId !== undefined)).toBe(true);
    });

    it('should have unique matches for every member', () => {
      const uniqueLinks = [
        ...new Set(matchedMembers.map(({ matchedMemberId }) => matchedMemberId)),
      ];

      expect(uniqueLinks.length).toEqual(matchedMembers.length);
    });
  });

  describe('when member list has duplicate members', () => {
    const members: Member[] = [
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '1', // Duplicate ID
        name: 'Charlie',
      },
    ];

    it('should throw an error for duplicate member IDs', () => {
      expect(() => MatchingMemberService.matchMembers(members)).toThrowError(
        "List of element IDs aren't unique",
      );
    });
  });

  describe('when member list has an even number of members', () => {
    const members: Member[] = [
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Charlie',
      },
      {
        id: '4',
        name: 'David',
      },
    ];

    const matchedMembers = MatchingMemberService.matchMembers(members);

    it('should have every member matched with another member', () => {
      expect(matchedMembers.every((member) => member.matchedMemberId !== undefined)).toBe(true);
    });

    it('should have unique matches for every member', () => {
      const uniqueLinks = [
        ...new Set(matchedMembers.map(({ matchedMemberId }) => matchedMemberId)),
      ];

      expect(uniqueLinks.length).toEqual(matchedMembers.length);
    });
  });
});
