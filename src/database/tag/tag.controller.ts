import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiKeyAuthGuard } from '../auth/guards/api-key-auth.guard';

@Controller('tag')
@ApiTags('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tags' })
    async getTags(): Promise<TagEntity[]> {
        return await this.tagService.findAll();
    }

    @Get(':id/article')
    @ApiOperation({ summary: 'Get articles by tag' })
    @ApiImplicitParam({ name: 'id', type: String })
    async getArticlesByTag(@Param() id: string): Promise<TagEntity> {
        return await this.tagService.findByTag(id);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete tag' })
    @ApiImplicitParam({ name: 'id', type: String })
    async deleteTag(@Param() id: string): Promise<TagEntity> {
        return this.tagService.delete(id);
    }
}
