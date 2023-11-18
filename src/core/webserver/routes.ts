import { Application, Router } from 'express';
import RoutePaths from './routes.constans';
import DrawRouterFactory from '../../draw/draw-router.factory';

class Routes {
  private readonly drawRouterFactory: Router;

  constructor(private app: Application) {
    this.drawRouterFactory = DrawRouterFactory.create();
  }

  setup() {
    this.app.use(RoutePaths.draw, this.drawRouterFactory);
  }
}

export default Routes;
