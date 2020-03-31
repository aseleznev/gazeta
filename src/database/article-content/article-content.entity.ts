import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ImageEntity } from '../image/image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('article-content')
export class ArticleContentEntity {
    constructor(init?: Partial<ArticleContentEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @Column('integer', { nullable: false })
    order: number;

    @ApiProperty()
    @Column('date', { nullable: false })
    date: string;

    @ApiProperty()
    @Column('varchar', { nullable: false })
    type: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    text: string;

    @ApiProperty({ type: () => ArticleEntity })
    @ManyToOne(type => ArticleEntity)
    article: ArticleEntity;

    @ApiProperty({ type: () => ImageEntity })
    @OneToOne(type => ImageEntity, { nullable: true })
    @JoinColumn()
    image: ImageEntity;
}
