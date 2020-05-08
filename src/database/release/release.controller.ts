import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { ReleaseService } from './release.service';
import { ReleaseEntity } from './release.entity';
import { ApiKeyAuthGuard } from '../auth/guards/api-key-auth.guard';

@ApiTags('release')
@Controller('release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) {}

    @Get()
    @ApiOperation({ summary: 'Get all releases' })
    async getReleases(): Promise<ReleaseEntity[]> {
        return await this.releaseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get release for id' })
    @ApiImplicitParam({ name: 'id', type: String })
    async getRelease(@Param('id') id: string): Promise<ReleaseEntity> {
        return await this.releaseService.find(id);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create release' })
    @ApiImplicitBody({
        content: {},
        type: ReleaseEntity,
        name: 'release',
        description: 'Release data',
        required: true,
        isArray: false
    })
    async saveRelease(@Body() release: ReleaseEntity): Promise<ReleaseEntity> {
        // const releaseEntity = new ReleaseEntity(release);
        await this.releaseService.delete(release.id);
        return await this.releaseService.save(release);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete release' })
    @ApiImplicitParam({ name: 'id', type: String })
    async deleteRelease(@Param() id: string): Promise<ReleaseEntity> {
        return this.releaseService.delete(id);
    }
}
