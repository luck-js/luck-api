import { DrawLink, DrawLinkRecord } from './draw-link.interface';

class DrawLinkMapper {
  static toRecord({ member, happening, ...rest }: DrawLink): DrawLinkRecord {
    return {
      ...rest,
      memberId: member.id,
      happeningId: happening.id,
    };
  }
}

export default DrawLinkMapper;
