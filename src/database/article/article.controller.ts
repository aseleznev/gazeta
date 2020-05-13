import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { ReactionEntity } from '../reaction/reaction.entity';
import { ReactionService } from '../reaction/reaction.service';
import { ArticleDto } from './article.dto';
import { ApiKeyAuthGuard } from '../auth/guards/api-key-auth.guard';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService, private readonly reactionService: ReactionService) {}

    @Get()
    @ApiOperation({ summary: 'Get all articles' })
    async getArticles(): Promise<ArticleEntity[]> {
        return await this.articleService.findAll();
    }

    @ApiBearerAuth('apiKey')
    @UseGuards(ApiKeyAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create article' })
    @ApiImplicitBody({
        content: {},
        type: ArticleEntity,
        name: 'article',
        description: 'Article data',
        required: true,
        isArray: false
    })
    async saveArticle(@Body() article: ArticleEntity): Promise<ArticleEntity> {
        return this.articleService.save(article);
    }

    // @ApiBearerAuth('apiKey')
    // @UseGuards(ApiKeyAuthGuard)
    @Post(':id/like/:count')
    @ApiImplicitParam({ name: 'id', type: String })
    @ApiImplicitParam({ name: 'count', type: String })
    @ApiOperation({ summary: 'Create like' })
    async likeArticle(@Param('id') articleId: string, @Param('count') count: number): Promise<ReactionEntity> {
        const article = await this.articleService.findOne(articleId);
        return this.reactionService.like(article, +count);
    }

    // @ApiBearerAuth('apiKey')
    // @UseGuards(ApiKeyAuthGuard)
    @Post(':id/dislike/:count')
    @ApiImplicitParam({ name: 'id', type: String })
    @ApiImplicitParam({ name: 'count', type: String })
    @ApiOperation({ summary: 'Create dislike' })
    async dislikeArticle(@Param('id') articleId: string, @Param('count') count: number): Promise<ReactionEntity> {
        const article = await this.articleService.findOne(articleId);
        return this.reactionService.dislike(article, +count);
    }

    @ApiBearerAuth('apiKey')
    @UseGuards(ApiKeyAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete article' })
    @ApiImplicitParam({ name: 'id', type: String })
    async deleteArticle(@Param() id: string): Promise<ArticleEntity> {
        return this.articleService.delete(id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get article for id' })
    @ApiImplicitParam({ name: 'id', type: String })
    async getArticle(@Param('id') id: string): Promise<ArticleEntity | ArticleDto> {
        const article = await this.articleService.find(id);
        if (article) {
            const reactions = await this.reactionService.getArticleReactions(id);
            if (reactions) {
                return Object.assign(article, reactions);
            }
        }
        return article;
    }
}
