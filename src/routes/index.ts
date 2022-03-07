import { Router } from 'express';

import { versionRoutes } from './version.routes';

const routes = Router();

routes.use('/', versionRoutes);

export { routes };
