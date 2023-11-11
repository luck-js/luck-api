import express, { Router } from 'express';

class MemberRouter {
  private readonly router: Router = express.Router();

  setup(): Router {
    this.router.route('/').get(() => {
      console.log('MemberRouter - init');
    });

    return this.router;
  }
}

export default MemberRouter;
