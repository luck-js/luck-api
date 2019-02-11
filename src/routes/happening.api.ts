import { Request, Response } from 'express';
import { catchError, map, take } from 'rxjs/operators';
import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';
import { Observable, of } from 'rxjs';

export class HappeningApi {
  constructor(private relationMemberHappeningService: RelationMemberHappeningService) {}

  public create(req: Request, res: Response) {
    this.relationMemberHappeningService
      .createOwnerRelationOfHappening()
      .pipe(
        take(1),
        map(relationId => res.json(relationId)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public edit(req: Request, res: Response) {
    const { id } = req.params;
    const option = req.body;
    this.relationMemberHappeningService
      .editHappening(id, option)
      .pipe(
        take(1),
        map(happening => res.json(happening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public publish(req: Request, res: Response) {
    const { id } = req.params;
    this.relationMemberHappeningService
      .publish(id)
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
    this.relationMemberHappeningService
      .addParticipant(id, name)
      .pipe(
        take(1),
        map(participant => res.json(participant)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public getDetailedParticipantListInformation(req: Request, res: Response) {
    const { id } = req.params;

    this.relationMemberHappeningService
      .getDetailedParticipantListInformation(id)
      .pipe(
        take(1),
        map(memberUniqueLinkDataList => res.json(memberUniqueLinkDataList)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public getGenerateDetailedParticipantListInformation(req: Request, res: Response) {
    const { id } = req.params;
    this.relationMemberHappeningService
      .getGenerateDetailedParticipantListInformation(id)
      .pipe(
        take(1),
        map(createdHappening => res.json(createdHappening)),
        catchError(val => this.sendError(res, 400, val)),
      )
      .subscribe();
  }

  public generateDetailedParticipantListInformation(req: Request, res: Response) {
    const { happening } = req.body;
    const { id } = req.params;
    this.relationMemberHappeningService
      .generateDetailedParticipantListInformation(id, happening)
      .pipe(
        take(1),
        map(createdHappening => res.json(createdHappening)),
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
