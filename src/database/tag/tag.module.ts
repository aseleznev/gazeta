import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';

@Module({
    providers: [TagService],
    imports: [TypeOrmModule.forFeature([TagEntity])],
    exports: [TagService]
})
export class TagModule {}
