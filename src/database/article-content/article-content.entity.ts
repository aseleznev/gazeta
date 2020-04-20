import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ImageEntity } from '../image/image.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ReleaseEntity } from "../release/release.entity";

@Entity('article-content')
export class ArticleContentEntity {
    constructor(init?: Partial<ArticleContentEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
    @ApiProperty()
    @PrimaryColumn('varchar', { length: 30 })
    id: string;

    @ApiProperty()
    @Column('integer', { nullable: false })
    order: number;

    @ApiProperty()
    @Column('varchar', { nullable: false })
    type: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    text: string;

    @ApiProperty({ type: () => ArticleEntity })
    @ManyToOne(type => ArticleEntity, {onDelete: 'CASCADE'})
    article: ArticleEntity;

    @ApiProperty({ type: () => ImageEntity })
    @OneToOne(type => ImageEntity, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    image: ImageEntity;
}
