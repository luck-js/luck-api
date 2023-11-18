import MemberService from '../member/member.service';
import { NewMember } from '../member/member.interface';
import HappeningService from '../happening/happening.service';
import { HappeningRecord } from '../happening/happening.interface';
import { DrawLinkRecord } from '../draw-link/draw-link.interface';
import DrawLinkService from '../draw-link/draw-link.service';

class MigrateService {
  constructor(
    private happeningService: HappeningService,
    private memberService: MemberService,
    private drawLinkService: DrawLinkService,
  ) {}

  async migrateHappenings(oldHappenings: OldHappening[]): Promise<void> {
    const happenings = this.mapToHappenings(oldHappenings);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < happenings.length; i++) {
      const happening = happenings[i];
      // eslint-disable-next-line no-await-in-loop
      await this.happeningService.recreate(happening);
    }
  }

  async migrateMembers(oldMembers: OldMember[]): Promise<void> {
    const members = this.mapToMembers(oldMembers);
    await this.memberService.createList(members);
  }

  async migrateMemberParticipation(
    oldMemberParticipations: OldMemberParticipation[],
  ): Promise<void> {
    const drawLinkRecords = this.mapToDrawLinkRecords(oldMemberParticipations);
    await this.drawLinkService.recreateList(drawLinkRecords);
  }

  private mapToHappenings(oldHappenings: OldHappening[]): HappeningRecord[] {
    return oldHappenings.map(({ id, name, description, memberIds, createdAt }) => ({
      id,
      name,
      description,
      memberIds,
      createdAt,
    }));
  }

  private mapToMembers(oldMembers: OldMember[]): NewMember[] {
    return oldMembers.map(({ name, id, eventMemberRole }) => {
      const matchedMemberId = eventMemberRole.matchedMemberId ?? '';
      return {
        name,
        id,
        matchedMemberId,
      };
    });
  }

  private mapToDrawLinkRecords(
    oldMemberParticipations: OldMemberParticipation[],
  ): DrawLinkRecord[] {
    return oldMemberParticipations.map(({ id, happeningId, memberId }) => ({
      id,
      happeningId,
      memberId,
    }));
  }
}

export interface OldHappening {
  _id: {
    $oid: string;
  };
  memberIds: string[];
  id: string;
  description: string;
  isPublish: boolean;
  name: string;
  createdAt: string;
  __v: number;
}
interface OldMember {
  __v: number;
  _id: {
    $oid: string;
  };
  id: string;
  name: string;
  eventMemberRole: {
    _id: {
      $oid: string;
    };
    abilityToRandom: boolean;
    matchedMemberId: string;
    type: string;
  };
}
interface OldMemberParticipation {
  _id: {
    $oid: string;
  };
  id: string;
  memberId: string;
  happeningId: string;
  __v: number;
}
export default MigrateService;
