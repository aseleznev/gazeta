import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ImageEntity } from '../image/image.entity';

@Entity('tag')
export class TagEntity {
    constructor(init?: Partial<TagEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @PrimaryGeneratedColumn()
    id: string;

    @Column('varchar', { nullable: true })
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @OneToOne(type => ImageEntity)
    @JoinColumn()
    image: ImageEntity;
}
