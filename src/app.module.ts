import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseEntity } from './database/release/release.entity';
import { ArticleEntity } from './database/article/article.entity';
import { ArticleContentEntity } from './database/article-content/article-content.entity';
import { ImageEntity } from './database/image/image.entity';
import { TagEntity } from './database/tag/tag.entity';
import { ReleaseModule } from './database/release/release.module';
import { ArticleModule } from './database/article/article.module';
import { ArticleContentModule } from './database/article-content/article-content.module';
import { TagModule } from './database/tag/tag.module';
import { ImageModule } from './database/image/image.module';

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
        }),
        ReleaseModule,
        ArticleModule,
        ArticleContentModule,
        TagModule,
        ImageModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
