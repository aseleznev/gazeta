import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reaction')
export class ReactionEntity {
    constructor(init?: Partial<ReactionEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column('integer', { nullable: true })
    like: number;

    @ApiProperty()
    @Column('integer', { nullable: true })
    dislike: number;

    @ApiProperty({ type: () => ArticleEntity })
    @ManyToOne(type => ArticleEntity, { onDelete: 'CASCADE' })
    article: ArticleEntity;
}
