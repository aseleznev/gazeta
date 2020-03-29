import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { ReleaseEntity } from '../release/release.entity';
import { ArticleContentEntity } from '../article-content/article-content.entity';
import { ImageEntity } from '../image/image.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('article')
export class ArticleEntity {
    constructor(init?: Partial<ArticleEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
    @PrimaryGeneratedColumn()
    id: string;

    @Column('varchar', { nullable: true })
    title: string;

    @Column('date', { nullable: true })
    date: string;

    @Column('text', { nullable: true })
    description: string;

    @ManyToOne(
        type => ReleaseEntity,
        release => release.articles
    )
    release: ReleaseEntity;

    @OneToMany(
        type => ArticleContentEntity,
        content => content.article
    )
    content: ArticleContentEntity[];

    @ManyToMany(type => TagEntity)
    @JoinTable()
    tag: TagEntity[];

    @OneToOne(type => ImageEntity)
    @JoinColumn()
    image: ImageEntity;
}
