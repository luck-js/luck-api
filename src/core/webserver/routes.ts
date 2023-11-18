import { Application, Router } from 'express';
import MemberRouterFactory from '../../member/member-router.factory';
import RoutePaths from './routes.constans';
import HappeningRouterFactory from '../../happening/happening-router.factory';

class Routes {
  private readonly memberRouter: Router;
  private readonly happeningRouter: Router;

  constructor(private app: Application) {
    this.memberRouter = MemberRouterFactory.create();
    this.happeningRouter = HappeningRouterFactory.create();
  }

  setup() {
    this.app.use(RoutePaths.member, this.memberRouter);
    this.app.use(RoutePaths.happening, this.happeningRouter);
  }
}

export default Routes;
