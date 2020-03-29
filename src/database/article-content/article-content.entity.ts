import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ImageEntity } from '../image/image.entity';

@Entity('article-content')
export class ArticleContentEntity {
    constructor(init?: Partial<ArticleContentEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
    @PrimaryGeneratedColumn()
    id: string;

    @Column('integer', { nullable: false })
    order: number;

    @Column('date', { nullable: false })
    date: string;

    @Column('varchar', { nullable: false })
    type: string;

    @Column('text', { nullable: true })
    text: string;

    @ManyToOne(
        type => ArticleEntity,
        article => article.content
    )
    article: ArticleEntity;

    @OneToOne(type => ImageEntity)
    @JoinColumn()
    image: ImageEntity;
}
