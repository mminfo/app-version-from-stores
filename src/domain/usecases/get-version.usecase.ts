import { Either } from 'fp-ts/lib/Either';

import { VersionEntity } from '../entities/version.entity';
import { AppError } from '../errors/app.error';
import {
	IGetVersionDTO,
	IVersionRepository,
} from '../repositories/version.repository.interface';

export class GetVersionUseCase {
	constructor(private readonly versionRepository: IVersionRepository) {}

	async execute({
		ios,
		android,
	}: IGetVersionDTO): Promise<Either<AppError, VersionEntity>> {
		return await this.versionRepository.getVersion({
			ios,
			android,
		});
	}
}
