import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MemberParticipationService } from '../../domain/member-participation/member-participation.service';

export class HappeningApi {
  constructor(private memberParticipationService: MemberParticipationService) {}

  public getDetailedParticipantListInformation(req: Request, res: Response) {
    const { id } = req.params;

    /*this.memberParticipationService
      .getParticipantsView(id)
      .pipe(
        take(1),
        map(memberUniqueLinkDataList => res.json(memberUniqueLinkDataList)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();*/
  }

  public getGenerateDetailedParticipantListInformation(req: Request, res: Response) {
    const { id } = req.params;
    /*this.memberParticipationService
      .getGeneratedParticipantUniqueLinks(id)
      .pipe(
        take(1),
        map(createdHappening => res.json(createdHappening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();*/
  }

  private sendError(res: Response, code: number, text: string): Observable<null> {
    res.status(code);
    res.send(text);
    return of();
  }
}
