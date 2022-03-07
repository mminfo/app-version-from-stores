import { VersionEntity } from '../entities/version.entity';

export interface IGetVersionDTO {
	ios: string;
	android: string;
}

export interface IVersionRepository {
	getVersion({ ios, android }: IGetVersionDTO): Promise<VersionEntity>;
	getAndroidVersion(id: string): Promise<string>;
	getIosVersion(id: string): Promise<string>;
}
