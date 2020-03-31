import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from '../image/image.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../article/article.entity';

@Entity('release')
export class ReleaseEntity {
    constructor(init?: Partial<ReleaseEntity>) {
        if (init) {
            Object.assign(this, init);
            if (init.articles && init.articles.length > 0) {
                this.articles = init.articles.map(article => new ArticleEntity(article));
            }
        }
    }

    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    title: string;

    @ApiProperty()
    @Column('date', { nullable: true })
    date: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty({ type: () => ArticleEntity })
    @OneToMany(
        type => ArticleEntity,
        article => article.release,
        { cascade: true }
    )
    articles: ArticleEntity[];

    @ApiProperty({ type: () => ImageEntity })
    @OneToOne(type => ImageEntity, { nullable: true })
    @JoinColumn()
    image: ImageEntity;
}
