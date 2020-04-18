import { Router, Request, Response } from 'express';
import { getNotes } from './get-notes';
import { addNotes } from './add-notes';
import { updateNotes } from './update-notes';

const router: Router = Router();

router
  .route('/notes')
  .get((req: Request, res: Response) => getNotes(req, res))
  .post((req: Request, res: Response) => addNotes(req, res));

router.route('/notes/:id').put((req: Request, res: Response) => updateNotes(req, res));

export default router;
