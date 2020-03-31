import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) {}

    async findAll(): Promise<ArticleEntity[]> {
        return await this.articleRepository.find({ relations: ['image'] });
    }

    async find(id: number): Promise<ArticleEntity> {
        return await this.articleRepository.findOne(id, { relations: ['content', 'content.image', 'tags'] });
    }

    async save(article: ArticleEntity): Promise<ArticleEntity> {
        return await this.articleRepository.save(article);
    }
}
