import { Controller, Get } from '@nestjs/common';
import { StatService } from './stat.service';
import { ApiOperation } from '@nestjs/swagger';
import { ArticleEntity } from '../article/article.entity';

@Controller('stat')
export class StatController {
    constructor(private readonly statService: StatService) {}

    @Get()
    @ApiOperation({ summary: 'Get all articles' })
    async getStats(): Promise<ArticleEntity[]> {
        return await this.statService.findAll();
    }
}
