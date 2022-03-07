import { Either } from 'fp-ts/lib/Either';

import { AndroidVersionEntity } from '../entities/android-version.entity';
import { IosVersionEntity } from '../entities/ios-version.entity';
import { VersionEntity } from '../entities/version.entity';
import { AppError } from '../errors/app.error';

export interface IGetAndroidVersionDTO {
	id: string;
}
export interface IGetIosVersionDTO {
	id: string;
}
export interface IGetVersionDTO {
	ios: string;
	android: string;
}

export interface IVersionRepository {
	getVersion({
		ios,
		android,
	}: IGetVersionDTO): Promise<Either<AppError, VersionEntity>>;
	getAndroidVersion({
		id,
	}: IGetAndroidVersionDTO): Promise<Either<AppError, AndroidVersionEntity>>;
	getIosVersion({
		id,
	}: IGetIosVersionDTO): Promise<Either<AppError, IosVersionEntity>>;
}
