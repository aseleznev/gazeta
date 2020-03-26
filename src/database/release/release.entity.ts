import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('release')
export class ReleaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column('varchar', {nullable: true})
    title: string;
    @Column('varchar', {nullable: true})
    image: string;
    @Column('text', {nullable: true})
    description: string;

    constructor(init?: Partial<ReleaseEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}