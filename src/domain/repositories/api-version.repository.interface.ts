import { ApiVersionEntity } from '../entities/api-version.entity';

export interface IApiVersionRepository {
	getVersion(iosID: string, androidID: string): Promise<ApiVersionEntity>;
	getAndroidVersion(id: string): Promise<string>;
	getIosVersion(id: string): Promise<string>;
}
