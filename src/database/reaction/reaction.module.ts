import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionEntity } from './reaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReactionEntity])],
    providers: [ReactionService],
    exports: [ReactionService]
})
export class ReactionModule {}
