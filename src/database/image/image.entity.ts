import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReleaseEntity } from '../release/release.entity';
import { ArticleEntity } from '../article/article.entity';
import { ArticleContentEntity } from '../article-content/article-content.entity';

@Entity('image')
export class ImageEntity {
    constructor(init?: Partial<ImageEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryColumn('varchar', { length: 30 })
    id: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    alt: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    src: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    filename: string;

    @OneToOne(
        type => ReleaseEntity,
        release => release.image,
        { onDelete: 'CASCADE' }
    )
    release: ReleaseEntity;

    @OneToOne(
        type => ArticleEntity,
        article => article.image,
        { onDelete: 'CASCADE' }
    )
    article: ArticleEntity;

    @OneToOne(
        type => ArticleContentEntity,
        articleContent => articleContent.image,
        { onDelete: 'CASCADE' }
    )
    articleContent: ArticleContentEntity;
}
