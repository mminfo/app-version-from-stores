import axios from 'axios';

import { ApiVersionRepository } from '../../data/repositories/api-version.repository';
import { GetApiVersionUseCase } from '../../domain/usecases/get-api-version.usecase';
import { GetVersionsController } from '../controllers/get-version.controller';

const apiVersionRepository = new ApiVersionRepository(axios);
const getApiVersionUseCase = new GetApiVersionUseCase(apiVersionRepository);
const getVersionsController = new GetVersionsController(getApiVersionUseCase);

export { getVersionsController };
