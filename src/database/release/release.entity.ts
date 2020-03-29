import { Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { ImageEntity } from '../image/image.entity';

@Entity('release')
export class ReleaseEntity {
    constructor(init?: Partial<ReleaseEntity>) {
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

    @OneToMany(
        type => ArticleEntity,
        article => article.release
    )
    @JoinTable()
    articles: ArticleEntity[];

    @OneToOne(type => ImageEntity)
    @JoinColumn()
    image: ImageEntity;
}
