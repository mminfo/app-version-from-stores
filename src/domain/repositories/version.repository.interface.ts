import { Either } from 'fp-ts/lib/Either';

import { VersionEntity } from '../entities/version.entity';
import { AppError } from '../errors/app.error';

export interface IGetVersionDTO {
	ios: string;
	android: string;
}

export interface IVersionRepository {
	getVersion({
		ios,
		android,
	}: IGetVersionDTO): Promise<Either<AppError, VersionEntity>>;
	getAndroidVersion(id: string): Promise<Either<AppError, string>>;
	getIosVersion(id: string): Promise<Either<AppError, string>>;
}
