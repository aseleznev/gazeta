import { Module } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseEntity } from './release.entity';
import { ReleaseController } from './release.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ReleaseEntity])],
    providers: [ReleaseService],
    exports: [ReleaseService],
    controllers: [ReleaseController]
})
export class ReleaseModule {}
