import { Router, Request, Response } from 'express';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { HappeningApi } from './happening.api';
import { MEMBER_INITIAL_LIST_MOCK } from '../../domain/member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../../domain/happening/happening.mock';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../../domain/member-participation/member-participation.mock';
import { GetMemberParticipation } from '../../application/get-member-participation';
import { GetMatchedMember } from '../../application/matched-member';
import { MemberParticipationController } from '../../interfaces/member-participation.controller';

const router: Router = Router();

const DIContainer = DIContainerProvider(
  [...MEMBER_INITIAL_LIST_MOCK],
  [...HAPPENING_INITIAL_LIST_MOCK],
  [...MEMBER_PARTICIPATIONS_INITIAL_MOCK],
);

const memberParticipationController = DIContainer.get<MemberParticipationController>(
  IDENTIFIER.MemberParticipationController,
);
const happeningApi = DIContainer.get<HappeningApi>(IDENTIFIER.HappeningApi);

router
  .route('/participation-happening/:id')
  .get((req: Request, res: Response) =>
    memberParticipationController.getMemberParticipation(req, res),
  );

router
  .route('/participation-happening/matched-member/:id')
  .get((req: Request, res: Response) => memberParticipationController.getMatchedMember(req, res));

router
  .route('/happening/create')
  .post((req: Request, res: Response) =>
    memberParticipationController.createMemberParticipation(req, res),
  );

router
  .route('/happening/edit/:id')
  .post((req: Request, res: Response) =>
    memberParticipationController.editHappeningMetadata(req, res),
  );

router
  .route('/happening/add-participant/:id')
  .post((req: Request, res: Response) =>
    memberParticipationController.addParticipantMember(req, res),
  );

router
  .route('/happening/publish/:id')
  .post((req: Request, res: Response) => memberParticipationController.publishHappening(req, res));

router
  .route('/happening/get-detailed-participant-list-information/:id')
  .get((req: Request, res: Response) =>
    happeningApi.getDetailedParticipantListInformation(req, res),
  );

router
  .route('/happening/generate-detailed-participant-list-information/:id')
  .get((req: Request, res: Response) =>
    happeningApi.getGenerateDetailedParticipantListInformation(req, res),
  )
  .post((req: Request, res: Response) =>
    happeningApi.generateDetailedParticipantListInformation(req, res),
  );

export default router;
