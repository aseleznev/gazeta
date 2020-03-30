import { Module } from '@nestjs/common';
import { ArticleContentService } from './article-content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleContentEntity } from './article-content.entity';

@Module({
    providers: [ArticleContentService],
    imports: [TypeOrmModule.forFeature([ArticleContentEntity])],
    exports: [ArticleContentService]
})
export class ArticleContentModule {}
