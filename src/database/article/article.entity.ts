import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import { ReleaseEntity } from '../release/release.entity';
import { ImageEntity } from '../image/image.entity';
import { TagEntity } from '../tag/tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleContentEntity } from '../article-content/article-content.entity';
import { AuthorEntity } from '../author/author.entity';

@Entity('article')
export class ArticleEntity {
    constructor(init?: Partial<ArticleEntity>) {
        if (init) {
            Object.assign(this, init);
            if (init.content && init.content.length > 0) {
                this.content = init.content.map(content => new ArticleContentEntity(content));
            }
        }
    }
    @ApiProperty()
    @PrimaryColumn('varchar', { length: 30 })
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    title: string;

    @ApiProperty()
    @Column('date', { nullable: true })
    date: string;

    @ApiProperty()
    @Column('integer', { nullable: false })
    order: number;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty({ type: () => ReleaseEntity })
    @ManyToOne(type => ReleaseEntity, { onDelete: 'CASCADE' })
    release: ReleaseEntity;

    @ApiProperty({ type: () => ArticleContentEntity, isArray: true })
    @OneToMany(
        type => ArticleContentEntity,
        content => content.article,
        { cascade: true, onDelete: 'CASCADE' }
    )
    content: ArticleContentEntity[];

    @ApiProperty({ type: () => TagEntity, isArray: true })
    @ManyToMany(
        type => TagEntity,
        tag => tag.articles,
        { cascade: true, nullable: true, onDelete: 'CASCADE' }
    )
    @JoinTable()
    tags: TagEntity[];

    @ApiProperty({ type: () => ImageEntity })
    @OneToOne(type => ImageEntity, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    image: ImageEntity;

    @ApiProperty({ type: () => AuthorEntity })
    @ManyToOne(type => AuthorEntity, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    author: AuthorEntity;
}
