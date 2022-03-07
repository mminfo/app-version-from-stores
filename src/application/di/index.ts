import axios from 'axios';

import { ApiVersionRepository } from '../../data/repositories/api-version.repository';
import { GetAndroidVersionUseCase } from '../../domain/usecases/get-android-version.usecase';
import { GetIosVersionUseCase } from '../../domain/usecases/get-ios-version.usecase';
import { GetVersionUseCase } from '../../domain/usecases/get-version.usecase';
import { GetAndroidVersionController } from '../controllers/get-android-version.controller';
import { GetIosVersionController } from '../controllers/get-ios-version.controller';
import { GetVersionController } from '../controllers/get-version.controller';

const apiVersionRepository = new ApiVersionRepository(axios);

const getVersionUseCase = new GetVersionUseCase(apiVersionRepository);
const getVersionController = new GetVersionController(getVersionUseCase);

const getAndroidVersionUseCase = new GetAndroidVersionUseCase(
	apiVersionRepository
);
const getAndroidVersionController = new GetAndroidVersionController(
	getAndroidVersionUseCase
);

const getIosVersionUseCase = new GetIosVersionUseCase(apiVersionRepository);
const getIosVersionController = new GetIosVersionController(
	getIosVersionUseCase
);

export {
	getVersionController,
	getAndroidVersionController,
	getIosVersionController,
};
