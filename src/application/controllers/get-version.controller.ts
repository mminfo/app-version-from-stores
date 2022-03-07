import { Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import { GetVersionUseCase } from '../../domain/usecases/get-version.usecase';

class GetVersionController {
	constructor(private readonly getVersionUseCase: GetVersionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const ios = String(request.query.ios || '');
		const android = String(request.query.android || '');

		const version = await this.getVersionUseCase.execute({
			ios,
			android,
		});

		if (isLeft(version)) {
			return response.status(500).json(version.left);
		}

		return response.status(200).json(version);
	}
}

export { GetVersionController };
