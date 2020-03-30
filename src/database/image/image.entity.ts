import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity('image')
export class ImageEntity {
    constructor(init?: Partial<ImageEntity>) {
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
    @Column('varchar', { nullable: true })
    path: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    alt: string;
}
