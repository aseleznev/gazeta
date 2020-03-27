import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity])],
    providers: [ArticleService],
    exports: [ArticleService]
})
export class ArticleModule {}
