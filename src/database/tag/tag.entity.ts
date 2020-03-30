import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ImageEntity } from '../image/image.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity('tag')
export class TagEntity {
    constructor(init?: Partial<TagEntity>) {
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
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty()
    @OneToOne(type => ImageEntity)
    @JoinColumn()
    image: ImageEntity;
}
