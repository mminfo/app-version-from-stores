import { Either, right, left, isRight } from 'fp-ts/lib/Either';

import { IHttp } from '../../application/shared/http/http.interface';
import { VersionEntity } from '../../domain/entities/version.entity';
import { AppError } from '../../domain/errors/app.error';
import {
	IGetVersionDTO,
	IVersionRepository,
} from '../../domain/repositories/version.repository.interface';

export class ApiVersionRepository implements IVersionRepository {
	constructor(private readonly http: IHttp) {}

	async getVersion({
		ios,
		android,
	}: IGetVersionDTO): Promise<Either<AppError, VersionEntity>> {
		const iosVersion = await this.getIosVersion(ios);
		const androidVersion = await this.getAndroidVersion(android);

		return right({
			ios: isRight(iosVersion) ? iosVersion.right : '',
			android: isRight(androidVersion) ? androidVersion.right : '',
		});
	}

	async getAndroidVersion(id: string): Promise<Either<AppError, string>> {
		const url = `https://play.google.com/store/apps/details?id=${id}`;
		const selector = '<div class="IQ1z0d"><span class="htlgb">';

		try {
			const body = await this.http.get(url).then((res) => res.data);
			const version = body.split(selector)[4].split('</span>')[0];

			return right(version);
		} catch (error) {
			return left(error);
		}
	}

	async getIosVersion(id: string): Promise<Either<AppError, string>> {
		const url = `https://apps.apple.com/br/app/id${id}`;
		const selector = 'whats-new__latest__version">Versão ';

		try {
			const body = await this.http.get(url).then((res) => res.data);
			const version = body.split(selector)[1].split('</p>')[0];

			return right(version);
		} catch (error) {
			return left(error);
		}
	}
}
