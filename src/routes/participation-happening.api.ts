import { Request, Response } from 'express';
import { MemberParticipationService } from '../domain/member-participation/member-participation.service';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class ParticipationHappeningApi {
  constructor(private relationMemberHappeningService: MemberParticipationService) {}

  public getDataView(req: Request, res: Response) {
    const { id } = req.params;
    this.relationMemberHappeningService
      .getMemberParticipationView(id)
      .pipe(
        take(1),
        map(memberInformationView => res.json(memberInformationView)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public getMatchedMember(req: Request, res: Response) {
    const { id } = req.params;
    this.relationMemberHappeningService
      .getMatchedMember(id)
      .pipe(
        take(1),
        map(memberView => res.json(memberView)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  private sendError(res: Response, code: number, text: string): Observable<null> {
    res.status(code);
    res.send(text);
    return of();
  }
}
