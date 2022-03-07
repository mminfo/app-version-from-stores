import { Request, Response } from 'express';

import { GetApiVersionUseCase } from '../../domain/usecases/get-api-version.usecase';

class GetVersionsController {
	constructor(private readonly getApiVersionUseCase: GetApiVersionUseCase) {}
	async handle(request: Request, response: Response): Promise<Response> {
		const { ios, android } = request.query;

		const version = await this.getApiVersionUseCase.execute(
			String(ios || ''),
			String(android || '')
		);

		return response.status(200).json(version);
	}
}

export { GetVersionsController };
