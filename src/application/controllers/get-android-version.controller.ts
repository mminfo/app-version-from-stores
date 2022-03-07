import { Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import { GetAndroidVersionUseCase } from '../../domain/usecases/get-android-version.usecase';

class GetAndroidVersionController {
	constructor(
		private readonly getAndroidVersionUseCase: GetAndroidVersionUseCase
	) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const id = String(request.params.id || '');

		const version = await this.getAndroidVersionUseCase.execute({
			id,
		});

		if (isLeft(version)) {
			return response.status(500).json(version.left);
		}

		return response.status(200).json(version.right);
	}
}

export { GetAndroidVersionController };
