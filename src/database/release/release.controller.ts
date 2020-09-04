import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { ReleaseService } from './release.service';
import { ReleaseEntity } from './release.entity';
import { ApiKeyAuthGuard } from '../auth/guards/api-key-auth.guard';
import * as rawbody from 'raw-body';
import { StatService } from '../stat/stat.service';
import { StatEntity } from '../stat/stat.entity';

@ApiTags('release')
@Controller('release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService, private readonly statService: StatService) {}

    @Get()
    @ApiOperation({ summary: 'Get all releases' })
    async getReleases(@Req() req): Promise<ReleaseEntity[]> {
        console.log('client ip');
        console.log(req.clientIp);
        return await this.releaseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get release for id' })
    @ApiImplicitParam({ name: 'id', type: String })
    async getRelease(@Req() req, @Param('id') id: string): Promise<ReleaseEntity> {
        const stat = new StatEntity({
            userAgent: req.headers['user-agent'],
            entityId: id,
            entityType: 'release',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            ip: req.clientIp
        });
        await this.statService.save(stat);
        return await this.releaseService.find(id);
    }

    @ApiBearerAuth('apiKey')
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
    async saveRelease(@Body() release: ReleaseEntity, @Req() req): Promise<ReleaseEntity> {
        // const releaseEntity = new ReleaseEntity(release);
        // if (req.readable) {
        //     // body is ignored by NestJS
        //     const raw = await rawbody(req);
        //     const text = raw.toString().trim();
        //     console.log('body:', text);
        // } else {
        //     // body is parsed by NestJS
        //     console.log('data:', release);
        // }
        await this.releaseService.delete(release.id);
        return await this.releaseService.save(release);
    }

    @ApiBearerAuth('apiKey')
    @UseGuards(ApiKeyAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete release' })
    @ApiImplicitParam({ name: 'id', type: String })
    async deleteRelease(@Param() id: string): Promise<ReleaseEntity> {
        return this.releaseService.delete(id);
    }

    @Post('log')
    @ApiOperation({ summary: 'log request data for debug' })
    async logRequest(@Body() data, @Req() req) {
        if (req.readable) {
            // body is ignored by NestJS
            const raw = await rawbody(req);
            const text = raw.toString().trim();
            console.log('body:', text);
        } else {
            // body is parsed by NestJS
            console.log('data:', data);
        }
    }
}
