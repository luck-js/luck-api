import { Request, Response } from 'express';
import { RelationMemberHappeningService } from '../relation-member-happening/relation-member-happening.service';

export class ParticipationHappeningApi {
    constructor(private relationMemberHappeningService: RelationMemberHappeningService) {
    }

    public getDataView(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const memberInformationView = this.relationMemberHappeningService.getDataView(id);

            res.json(memberInformationView);
        } catch (err) {
            res.send(err);
        }
    }

    public getMatchedMember(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const memberView = this.relationMemberHappeningService.getMatchedMember(id);

            res.json(memberView);
        } catch (err) {
            res.send(err);
        }
    }
}
