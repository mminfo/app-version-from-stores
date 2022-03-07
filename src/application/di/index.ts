import axios from 'axios';

import { ApiVersionRepository } from '../../data/repositories/api-version.repository';
import { GetVersionUseCase } from '../../domain/usecases/get-version.usecase';
import { GetVersionController } from '../controllers/get-version.controller';

const apiVersionRepository = new ApiVersionRepository(axios);
const getVersionUseCase = new GetVersionUseCase(apiVersionRepository);
const getVersionController = new GetVersionController(getVersionUseCase);

export { getVersionController };
