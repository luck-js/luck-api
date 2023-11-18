import { Application, Router } from 'express';
import RoutePaths from './routes.constans';
import DrawRouterFactory from '../../draw/draw-router.factory';
import DrawLinkRouterFactory from '../../draw-link/draw-link-router.factory';

class Routes {
  private readonly drawRouterFactory: Router;
  private readonly drawLinkRouterFactory: Router;

  constructor(private app: Application) {
    this.drawRouterFactory = DrawRouterFactory.create();
    this.drawLinkRouterFactory = DrawLinkRouterFactory.create();
  }

  setup() {
    this.app.use(RoutePaths.draw, this.drawRouterFactory);
    this.app.use(RoutePaths.drawLink, this.drawLinkRouterFactory);
  }
}

export default Routes;
