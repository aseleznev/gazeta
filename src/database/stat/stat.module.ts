import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatEntity } from './stat.entity';
import { StatController } from './stat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StatEntity])],
    providers: [StatService],
    exports: [StatService],
    controllers: [StatController]
})
export class StatModule {}
