import { Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import { GetIosVersionUseCase } from '../../domain/usecases/get-ios-version.usecase';

class GetIosVersionController {
	constructor(private readonly getIosVersionUseCase: GetIosVersionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const id = String(request.params.id || '');

		const version = await this.getIosVersionUseCase.execute({
			id,
		});

		if (isLeft(version)) {
			return response.status(500).json(version.left);
		}

		return response.status(200).json(version.right);
	}
}

export { GetIosVersionController };
