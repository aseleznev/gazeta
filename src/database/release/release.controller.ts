import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReleaseService } from './release.service';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ReleaseEntity } from './release.entity';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';

@ApiTags('release')
@Controller('release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) {}

    @Get()
    @ApiOperation({ summary: 'Get all releases' })
    async getReleases():Promise<ReleaseEntity[]> {
        return await this.releaseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get release for id' })
    @ApiImplicitParam({ name: 'id', type: Number })
    async getRelease(@Param('id') id: number): Promise<ReleaseEntity> {
        return await this.releaseService.find(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The release has been successfully created.',
        type: ReleaseEntity
    })
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
        return this.releaseService.save(release);
    }
}
