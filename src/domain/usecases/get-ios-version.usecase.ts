import { Either } from 'fp-ts/lib/Either';

import { IosVersionEntity } from '../entities/ios-version.entity';
import { AppError } from '../errors/app.error';
import {
	IGetIosVersionDTO,
	IVersionRepository,
} from '../repositories/version.repository.interface';

export class GetIosVersionUseCase {
	constructor(private readonly versionRepository: IVersionRepository) {}

	async execute({
		id,
	}: IGetIosVersionDTO): Promise<Either<AppError, IosVersionEntity>> {
		return await this.versionRepository.getIosVersion({ id });
	}
}
