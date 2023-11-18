import { HappeningRecord } from './happening.interface';

export interface HappeningRepository {
  add(happening: HappeningRecord): Promise<HappeningRecord>;
}
