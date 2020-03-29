import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class ImageEntity {
    constructor(init?: Partial<ImageEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @PrimaryGeneratedColumn()
    id: string;

    @Column('varchar', { nullable: true })
    title: string;

    @Column('varchar', { nullable: true })
    path: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('varchar', { nullable: true })
    alt: string;

}
