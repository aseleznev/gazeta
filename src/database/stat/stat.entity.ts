import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('stat')
export class StatEntity {
    constructor(init?: Partial<StatEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    entityType: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    entityId: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    date: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    time: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    userAgent: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    ip: string;
}
