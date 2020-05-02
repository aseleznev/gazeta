import { ArticleEntity } from './article.entity';

export interface ArticleDto extends ArticleEntity {
    like: number;
    dislike: number;
}
