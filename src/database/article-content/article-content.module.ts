import { Module } from '@nestjs/common';
import { ArticleContentService } from './article-content.service';

@Module({
  providers: [ArticleContentService]
})
export class ArticleContentModule {}
