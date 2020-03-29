import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseEntity } from './database/release/release.entity';
import { ArticleEntity } from './database/article/article.entity';
import { ArticleContentEntity } from './database/article-content/article-content.entity';
import { ImageEntity } from './database/image/image.entity';
import { TagEntity } from './database/tag/tag.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'gazeta',
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
            dropSchema: true,
            entities: [ReleaseEntity, ArticleEntity, ArticleContentEntity, ImageEntity, TagEntity]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
