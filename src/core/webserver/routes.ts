import { Application, Router } from 'express';
import MemberRouterFactory from '../../member/member-router.factory';
import RoutePaths from './routes.constans';

class Routes {
  private readonly memberRouter: Router;

  constructor(private app: Application) {
    this.memberRouter = MemberRouterFactory.create();
  }

  setup() {
    this.app.use(RoutePaths.member, this.memberRouter);
  }
}

export default Routes;
