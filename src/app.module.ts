import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseModule } from './database/release/release.module';
import { ArticleModule } from './database/article/article.module';
import { ArticleContentModule } from './database/article-content/article-content.module';
import { TagModule } from './database/tag/tag.module';
import { ImageModule } from './database/image/image.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),{
            path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('appConfig'),
            inject: [ConfigService]
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
