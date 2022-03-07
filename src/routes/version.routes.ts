import { Router } from 'express';

import { getVersionsController } from '../application/di';

const versionRoutes = Router();

versionRoutes.get('/', (request, response) => {
	return getVersionsController.handle(request, response);
});

export { versionRoutes };
