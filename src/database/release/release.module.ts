import { Module } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseEntity } from './release.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReleaseEntity])],
    providers: [ReleaseService],
    exports: [ReleaseService]
})
export class ReleaseModule {}
