import { ApiVersionEntity } from '../entities/api-version.entity';
import { IApiVersionRepository } from '../repositories/api-version.repository.interface';

export class GetApiVersionUseCase {
	constructor(private readonly apiVersionRepository: IApiVersionRepository) {}

	async execute(ios: string, android: string): Promise<ApiVersionEntity> {
		const apiVersion = await this.apiVersionRepository.getVersion(ios, android);
		return apiVersion;
	}
}
