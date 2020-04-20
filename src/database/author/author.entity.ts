import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../article/article.entity';

@Entity('author')
export class AuthorEntity {
    constructor(init?: Partial<AuthorEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryColumn('varchar', { length: 30 })
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    name: string;

    @OneToMany(
      type => ArticleEntity,
      article => article.author,
      { onDelete: 'CASCADE' }
    )
    articles: ArticleEntity[];
}
