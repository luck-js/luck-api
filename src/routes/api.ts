import { Router, Request, Response } from 'express';
import { DIContainerProvider } from '../di-container';
import IDENTIFIER from '../identifiers';
import { ParticipationHappeningApi } from './participation-happening.api';
import { HappeningApi } from './happening.api';
import { MEMBER_INITIAL_LIST_MOCK } from '../member/member.mock';
import { HAPPENING_INITIAL_LIST_MOCK } from '../happening/happening.mock';
import { MEMBER_PARTICIPATIONS_INITIAL_MOCK } from '../member-participation/member-participation.mock';

const router: Router = Router();

const DIContainer = DIContainerProvider(
  [...MEMBER_INITIAL_LIST_MOCK],
  [...HAPPENING_INITIAL_LIST_MOCK],
  [...MEMBER_PARTICIPATIONS_INITIAL_MOCK],
);
const participationHappeningApi = DIContainer.get<ParticipationHappeningApi>(
  IDENTIFIER.ParticipationHappeningApi,
);
const happeningApi = DIContainer.get<HappeningApi>(IDENTIFIER.HappeningApi);

router
  .route('/participation-happening/:id')
  .get((req: Request, res: Response) => participationHappeningApi.getDataView(req, res));

router
  .route('/participation-happening/matched-member/:id')
  .get((req: Request, res: Response) => participationHappeningApi.getMatchedMember(req, res));

router
  .route('/happening/create')
  .post((req: Request, res: Response) => happeningApi.create(req, res));

router
  .route('/happening/edit/:id')
  .post((req: Request, res: Response) => happeningApi.edit(req, res));

router
  .route('/happening/add-participant/:id')
  .post((req: Request, res: Response) => happeningApi.addParticipant(req, res));

router
  .route('/happening/publish/:id')
  .post((req: Request, res: Response) => happeningApi.publish(req, res));

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
