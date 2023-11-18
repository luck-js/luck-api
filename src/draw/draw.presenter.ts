import { Draw, DrawMemberView, DrawView } from './draw.interface';
import { DrawLink } from '../draw-link/draw-link.interface';

class DrawPresenter {
  private static mapToDrawMemberView(drawLinks: DrawLink[]): DrawMemberView[] {
    return drawLinks.map(({ id, member }) => ({
      name: member.name,
      uniqueLink: id,
    }));
  }

  static mapToDrawView(draw: Draw): DrawView {
    const { happening } = draw.drawLinks[0];
    return {
      id: draw.id,
      name: happening.name,
      description: happening.description,
      members: DrawPresenter.mapToDrawMemberView(draw.drawLinks),
    };
  }
}

export default DrawPresenter;
