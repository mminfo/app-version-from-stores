import { ApiVersionEntity } from '../../domain/entities/api-version.entity';
import { IApiVersionRepository } from '../../domain/repositories/api-version.repository.interface';

export interface IHttpService {
	get(url: string): Promise<any>;
}

export class ApiVersionRepository implements IApiVersionRepository {
	constructor(private readonly httpService: IHttpService) {}

	async getVersion(
		iosID: string,
		androidID: string
	): Promise<ApiVersionEntity> {
		const ios = await this.getIosVersion(iosID);
		const android = await this.getAndroidVersion(androidID);

		return {
			ios,
			android,
		};
	}

	async getAndroidVersion(id: string): Promise<string> {
		try {
			const url = `https://play.google.com/store/apps/details?id=${id}`;
			const body = await this.httpService.get(url).then((res) => res.data);
			const selector = '<div class="IQ1z0d"><span class="htlgb">';
			return body.split(selector)[4].split('</span>')[0];
		} catch (error) {
			console.log(error);
			return '';
		}
	}

	async getIosVersion(id: string): Promise<string> {
		try {
			const url = `https://apps.apple.com/br/app/id${id}`;
			const body = await this.httpService.get(url).then((res) => res.data);
			const selector = 'whats-new__latest__version">Versão ';
			return body.split(selector)[1].split('</p>')[0];
		} catch (error) {
			console.log(error);
			return '';
		}
	}
}
