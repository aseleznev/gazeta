import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { ArticleController } from './article.controller';
import { ReactionModule } from '../reaction/reaction.module';
import { StatModule } from '../stat/stat.module';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity]), ReactionModule, StatModule],
    providers: [ArticleService],
    exports: [ArticleService],
    controllers: [ArticleController]
})
export class ArticleModule {}
