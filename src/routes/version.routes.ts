import { Router } from 'express';

import {
	getVersionController,
	getAndroidVersionController,
	getIosVersionController,
} from '../application/di';

const versionRoutes = Router();

versionRoutes.get('/android/:id', (request, response) =>
	getAndroidVersionController.handle(request, response)
);
versionRoutes.get('/ios/:id', (request, response) =>
	getIosVersionController.handle(request, response)
);
versionRoutes.get('/', (request, response) =>
	getVersionController.handle(request, response)
);

export { versionRoutes };
