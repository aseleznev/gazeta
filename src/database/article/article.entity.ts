import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('article')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column('varchar', {nullable: true})
    title: string;
    @Column('varchar', {nullable: true})
    image: string;
    @Column('text', {nullable: true})
    description: string;

    constructor(init?: Partial<ArticleEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}