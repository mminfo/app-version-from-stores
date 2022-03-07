import { Either } from 'fp-ts/lib/Either';

import { AndroidVersionEntity } from '../entities/android-version.entity';
import { AppError } from '../errors/app.error';
import {
	IGetAndroidVersionDTO,
	IVersionRepository,
} from '../repositories/version.repository.interface';

export class GetAndroidVersionUseCase {
	constructor(private readonly versionRepository: IVersionRepository) {}

	async execute({
		id,
	}: IGetAndroidVersionDTO): Promise<Either<AppError, AndroidVersionEntity>> {
		return await this.versionRepository.getAndroidVersion({ id });
	}
}
