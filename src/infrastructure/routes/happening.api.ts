import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { MemberParticipationService } from '../../domain/member-participation/member-participation.service';
import { Observable, of } from 'rxjs';

export class HappeningApi {
  constructor(private memberParticipationService: MemberParticipationService) {}

  public create(req: Request, res: Response) {
    this.memberParticipationService
      .create()
      .pipe(
        take(1),
        map(id => res.json(id)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public edit(req: Request, res: Response) {
    const { id } = req.params;
    const option = req.body;
    this.memberParticipationService
      .updateHappeningMetadata(id, option)
      .pipe(
        take(1),
        map(happening => res.json(happening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public publish(req: Request, res: Response) {
    const { id } = req.params;
    this.memberParticipationService
      .publishHappening(id)
      .pipe(
        take(1),
        map(happening => res.json(happening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public addParticipant(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    this.memberParticipationService
      .addParticipantMember(id, name)
      .pipe(
        take(1),
        map(participant => res.json(participant)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

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

  public generateDetailedParticipantListInformation(req: Request, res: Response) {
    const { happening } = req.body;
    const { id } = req.params;
    /*this.memberParticipationService
      .generateParticipantUniqueLinks(id, happening)
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
