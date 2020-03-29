import { Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ImageEntity } from '../image/image.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity('release')
export class ReleaseEntity {
    constructor(init?: Partial<ReleaseEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    title: string;

    @ApiProperty()
    @Column('date', { nullable: true })
    date: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @OneToMany(
        type => ArticleEntity,
        article => article.release,
        { nullable: true }
    )
    @JoinTable()
    articles: ArticleEntity[];

    @OneToOne(type => ImageEntity, { nullable: true })
    @JoinColumn()
    image: ImageEntity;
}
