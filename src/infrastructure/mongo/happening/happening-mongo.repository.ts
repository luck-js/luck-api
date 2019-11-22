import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import HappeningModel from './happening.schema';
import { IHappeningRepository } from '../../../domain/happening/happening.repository';
import { IHappening } from '../../../domain/happening/happening.model';

@injectable()
export class HappeningMongoRepository implements IHappeningRepository {
  add(happening: IHappening): Observable<IHappening> {
    return from(new HappeningModel(happening).save());
  }

  getByIndex(id: string): Observable<IHappening> {
    return from(HappeningModel.findOne({ id: id }, null, { limit: 1 }).exec());
  }

  getAll(): Observable<IHappening[]> {
    return from(HappeningModel.find().exec());
  }

  update(happening: IHappening): Observable<IHappening> {
    return from(
      HappeningModel.findOneAndUpdate({ id: happening.id }, happening, {
        upsert: true,
        new: true,
      }).exec(),
    );
  }
}
