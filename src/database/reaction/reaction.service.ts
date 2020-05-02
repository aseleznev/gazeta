import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionEntity } from './reaction.entity';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Injectable()
export class ReactionService {
    constructor(
        @InjectRepository(ReactionEntity)
        private readonly reactionRepository: Repository<ReactionEntity>
    ) {}

    async like(article: ArticleEntity, count: number): Promise<ReactionEntity> {
        const reaction = this.reactionRepository.create({ like: count, article });
        return this.reactionRepository.save(reaction);
    }

    async dislike(article: ArticleEntity, count: number): Promise<ReactionEntity> {
        const reaction = this.reactionRepository.create({ dislike: count, article });
        return this.reactionRepository.save(reaction);
    }

    async getArticleReactions(articleId: string): Promise<any> {
        return await this.reactionRepository
            .createQueryBuilder('reactions')
            .select('articleId')
            .addSelect('sum(`like`)', 'like')
            .addSelect('sum(`dislike`)', 'dislike')
            .where('reactions.articleId=:articleId', { articleId })
            .groupBy('reactions.articleId')
            .getRawOne();
    }
}
