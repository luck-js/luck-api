import { Request, Response } from 'express';
import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';
import { map, take } from 'rxjs/operators';

export class ParticipationHappeningApi {
    constructor(private relationMemberHappeningService: RelationMemberHappeningService) {
    }

    public getDataView(req: Request, res: Response) {
        try {
            const { id } = req.params;
            this.relationMemberHappeningService.getDataView(id).pipe(
                take(1),
                map((memberInformationView) => res.json(memberInformationView))
            ).subscribe();

        } catch (err) {
            res.send(err);
        }
    }

    public getMatchedMember(req: Request, res: Response) {
        try {
            const { id } = req.params;
            this.relationMemberHappeningService.getMatchedMember(id).pipe(
                take(1),
                map((memberView) => res.json(memberView))
            ).subscribe();

        } catch (err) {
            res.send(err);
        }
    }
}
