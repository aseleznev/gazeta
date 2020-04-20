import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';
import { NestExpressApplication } from '@nestjs/platform-express';
const cors = require('cors');
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get('appConfig').nodePort;

    const options = new DocumentBuilder()
        .setTitle('GazEta')
        .setDescription('Gazprom nedra corporate newspaper')
        .setVersion('1.0')
        .addTag('release')
        .addTag('article')
        .addTag('article-content')
        .addTag('tag')
        .addTag('image')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
