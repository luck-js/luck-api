import { DrawLink, DrawLinkRecord } from './draw-link.interface';
import { Happening } from '../happening/happening.interface';
import { Member } from '../member/member.interface';

class DrawLinkMapper {
  static toRecord({ member, happening, ...rest }: DrawLink): DrawLinkRecord {
    return {
      ...rest,
      memberId: member.id,
      happeningId: happening.id,
    };
  }
  static toEntity(happening: Happening, drawLinkRecord: DrawLinkRecord): DrawLink {
    const { id, memberId } = drawLinkRecord;
    const member = happening.members.find((m) => m.id === memberId) as Member;
    return {
      id,
      member,
      happening,
    };
  }
}

export default DrawLinkMapper;
