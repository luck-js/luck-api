import { Application, Router } from 'express';
import MemberRouterFactory from '../../member/member-router.factory';

class Routes {
  private readonly memberRouter: Router;

  constructor(private app: Application) {
    this.memberRouter = MemberRouterFactory.create();
  }

  setup() {
    this.app.use('/api/v1/member', this.memberRouter);
  }
}

export default Routes;
