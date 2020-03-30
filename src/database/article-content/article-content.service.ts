import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleContentEntity } from './article-content.entity';

@Injectable()
export class ArticleContentService {
    constructor(
        @InjectRepository(ArticleContentEntity)
        private readonly articleContentRepository: Repository<ArticleContentEntity>
    ) {}

    async findAll(): Promise<ArticleContentEntity[]> {
        return await this.articleContentRepository.find();
    }

    async find(id: number): Promise<ArticleContentEntity> {
        return await this.articleContentRepository.findOne(id);
    }

    async save(article: ArticleContentEntity): Promise<ArticleContentEntity> {
        return await this.articleContentRepository.save(article);
    }
}
