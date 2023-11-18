import { HappeningRecord } from './happening.interface';

export interface HappeningRepository {
  findById(id: string): Promise<HappeningRecord | null>;
  add(happening: HappeningRecord): Promise<HappeningRecord>;
}
