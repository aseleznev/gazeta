import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';

@Module({
    providers: [ImageService],
    imports: [TypeOrmModule.forFeature([ImageEntity])],
    exports: [ImageService]
})
export class ImageModule {}
