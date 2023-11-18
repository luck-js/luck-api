import { Draw, DrawRecord } from './draw.interface';

class DrawLinkMapper {
  static toRecord({ drawLinks, ...rest }: Draw): DrawRecord {
    const drawLinkIds = drawLinks.map(({ id }) => id);
    return {
      ...rest,
      drawLinkIds,
    };
  }
}

export default DrawLinkMapper;
