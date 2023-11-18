import { DrawLink, DrawLinkView } from './draw-link.interface';
import { Member } from '../member/member.interface';

class DrawLinkPresenter {
  static mapToDrawLinkView({ id, happening, member }: DrawLink): DrawLinkView {
    const matchedMember = happening.members.find((m) => m.id === member.matchedMemberId) as Member;
    const { name, description } = happening;

    return {
      id,
      name,
      description,
      memberName: member.name,
      matchedMemberName: matchedMember.name,
    };
  }
}

export default DrawLinkPresenter;
