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
        return await this.articleRepository.find({ relations: ['tags', 'author', 'image'] });
    }

    async find(id: string): Promise<ArticleEntity> {
        const article = await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.content', 'content')
            .leftJoinAndSelect('content.image', 'image')
            .leftJoinAndSelect('article.image', 'articleImage')
            .leftJoinAndSelect('article.author', 'author')
            .leftJoinAndSelect('article.tags', 'tags')
            .where('article.id=:id')
            .setParameter('id', id)
            .orderBy('content.order', 'ASC')
            .getOne();

        return article;
    }

    async save(article: ArticleEntity): Promise<ArticleEntity> {
        return await this.articleRepository.save(article);
    }

    async delete(id: string): Promise<ArticleEntity> {
        const article = await this.articleRepository.findOne(id);
        if (!article) {
            return article;
        }
        return await this.articleRepository.remove(article);
        //return await this.articleRepository.delete({ id });
    }
}
