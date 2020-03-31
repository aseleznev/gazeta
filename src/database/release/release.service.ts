import { Injectable } from '@nestjs/common';
import { ReleaseEntity } from './release.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReleaseService {
    constructor(
        @InjectRepository(ReleaseEntity)
        private readonly releaseRepository: Repository<ReleaseEntity>
    ) {}

    async findAll(): Promise<ReleaseEntity[]> {
        return await this.releaseRepository.find({ relations: ['image'] });
    }

    async find(id: number): Promise<ReleaseEntity> {
        return await this.releaseRepository.findOne(id, { relations: ['image', 'articles', 'articles.image'] });
    }

    async save(release: ReleaseEntity): Promise<ReleaseEntity> {
        return await this.releaseRepository.save(release);
    }
}
