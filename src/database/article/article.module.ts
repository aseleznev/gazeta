import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { ArticleController } from './article.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity])],
    providers: [ArticleService],
    exports: [ArticleService],
    controllers: [ArticleController]
})
export class ArticleModule {}
