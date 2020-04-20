import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    @ApiOperation({ summary: 'Get all articles' })
    async getArticles(): Promise<ArticleEntity[]> {
        return await this.articleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get article for id' })
    @ApiImplicitParam({ name: 'id', type: String })
    async getArticle(@Param('id') id: string): Promise<ArticleEntity> {
        return await this.articleService.find(id);
    }

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
}
