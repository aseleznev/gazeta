import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { TagController } from './tag.controller';

@Module({
    providers: [TagService],
    imports: [TypeOrmModule.forFeature([TagEntity])],
    exports: [TagService],
    controllers: [TagController]
})
export class TagModule {}
