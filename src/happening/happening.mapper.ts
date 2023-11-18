import { Happening, HappeningRecord } from './happening.interface';

class HappeningMapper {
  static toRecord({ members, ...rest }: Happening): HappeningRecord {
    const memberIds = members.map(({ id }) => id);
    return {
      ...rest,
      memberIds,
    };
  }
}

export default HappeningMapper;
