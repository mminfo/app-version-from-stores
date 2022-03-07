import { Either, right, left, isRight } from 'fp-ts/lib/Either';

import { IHttp } from '../../application/shared/http/http.interface';
import { AndroidVersionEntity } from '../../domain/entities/android-version.entity';
import { IosVersionEntity } from '../../domain/entities/ios-version.entity';
import { VersionEntity } from '../../domain/entities/version.entity';
import { AppError } from '../../domain/errors/app.error';
import {
	IGetAndroidVersionDTO,
	IGetIosVersionDTO,
	IGetVersionDTO,
	IVersionRepository,
} from '../../domain/repositories/version.repository.interface';

export class ApiVersionRepository implements IVersionRepository {
	constructor(private readonly http: IHttp) {}

	async getVersion({
		ios,
		android,
	}: IGetVersionDTO): Promise<Either<AppError, VersionEntity>> {
		const iosVersion = await this.getIosVersion({ id: ios });
		const androidVersion = await this.getAndroidVersion({ id: android });

		return right({
			ios: isRight(iosVersion) ? iosVersion.right.version : '',
			android: isRight(androidVersion) ? androidVersion.right.version : '',
		});
	}

	async getAndroidVersion({
		id,
	}: IGetAndroidVersionDTO): Promise<Either<AppError, AndroidVersionEntity>> {
		const url = `https://play.google.com/store/apps/details?id=${id}`;
		const selector = '<div class="IQ1z0d"><span class="htlgb">';

		try {
			const body = await this.http.get(url).then((res) => res.data);
			const version = body.split(selector)[4].split('</span>')[0];

			return right({ version });
		} catch (error) {
			return left(error);
		}
	}

	async getIosVersion({
		id,
	}: IGetIosVersionDTO): Promise<Either<AppError, IosVersionEntity>> {
		const url = `https://apps.apple.com/br/app/id${id}`;
		const selector = 'whats-new__latest__version">Versão ';

		try {
			const body = await this.http.get(url).then((res) => res.data);
			const version = body.split(selector)[1].split('</p>')[0];

			return right({ version });
		} catch (error) {
			return left(error);
		}
	}
}
