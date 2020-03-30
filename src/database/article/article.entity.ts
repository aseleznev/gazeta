import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ReleaseEntity } from '../release/release.entity';
import { ImageEntity } from '../image/image.entity';
import { TagEntity } from '../tag/tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleContentEntity } from '../article-content/article-content.entity';

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

    @ApiProperty()
    @ManyToOne(type => ReleaseEntity)
    release: ReleaseEntity;

    @ApiProperty()
    @OneToMany(
        type => ArticleContentEntity,
        content => content.article,
        { cascade: true }
    )
    content: ArticleContentEntity[];

    @ApiProperty()
    @ManyToMany(type => TagEntity)
    @JoinTable()
    tag: TagEntity[];

    @ApiProperty()
    @OneToOne(type => ImageEntity, { nullable: true })
    @JoinColumn()
    image: ImageEntity;
}
