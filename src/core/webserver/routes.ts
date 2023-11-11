import { Application } from 'express';
import MemberRouter from '../../member/member.router';

class Routes {
  private memberRouter: MemberRouter;

  constructor(private app: Application) {
    this.memberRouter = new MemberRouter();
  }

  setup() {
    this.app.use('/api/v1/Member', this.memberRouter.setup());
  }
}

export default Routes;
