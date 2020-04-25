import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    async findAll(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }

    async find(id: number): Promise<TagEntity> {
        return await this.tagRepository.findOne(id);
    }

    async save(tag: TagEntity): Promise<TagEntity> {
        return await this.tagRepository.save(tag);
    }

    async findByTag(id: string): Promise<TagEntity> {
        return this.tagRepository.findOne(id, {
            relations: ['articles', 'articles.image', 'articles.author', 'articles.release']
        });
    }
}
