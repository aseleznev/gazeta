import { Injectable } from '@nestjs/common';
import { StatEntity } from './stat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatService {
    constructor(
        @InjectRepository(StatEntity)
        private readonly statRepository: Repository<StatEntity>
    ) {}

    async save(stat: StatEntity): Promise<StatEntity> {
        return await this.statRepository.save(stat);
    }

    async findAll(): Promise<StatEntity[]> {
        return await this.statRepository.find();
    }
}
