import { injectable } from 'inversify';
import { Observable, from } from 'rxjs';
import HappeningModel, { IHappening } from './happening.model';

@injectable()
export class HappeningRepository {
  public add({ id, name, description, isPublish, memberIds }: IHappening): Observable<IHappening> {
    return from(new HappeningModel({ id, name, description, isPublish, memberIds }).save());
  }

  public getByIndex(id: string): Observable<IHappening> {
    return from(HappeningModel.findOne({ id: id }, null, { limit: 1 }).exec());
  }

  public update(id: string, option: IHappening): Observable<IHappening> {
    return from(HappeningModel.findOneAndUpdate({ id }, option, { new: true }).exec());
  }
}
