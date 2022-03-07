import { VersionEntity } from '../entities/version.entity';
import {
	IGetVersionDTO,
	IVersionRepository,
} from '../repositories/version.repository.interface';

export class GetVersionUseCase {
	constructor(private readonly versionRepository: IVersionRepository) {}

	async execute({ ios, android }: IGetVersionDTO): Promise<VersionEntity> {
		const apiVersion = await this.versionRepository.getVersion({
			ios,
			android,
		});

		return apiVersion;
	}
}
