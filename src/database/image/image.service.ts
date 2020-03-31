import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>
    ) {}

    async findAll(): Promise<ImageEntity[]> {
        return await this.imageRepository.find();
    }

    async find(id: number): Promise<ImageEntity> {
        return await this.imageRepository.findOne(id);
    }

    async save(image: ImageEntity): Promise<ImageEntity> {
        return await this.imageRepository.save(image);
    }
}
