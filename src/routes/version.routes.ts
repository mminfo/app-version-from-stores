import { Router } from 'express';

import { getVersionController } from '../application/di';

const versionRoutes = Router();

versionRoutes.get('/', (request, response) =>
	getVersionController.handle(request, response)
);

export { versionRoutes };
