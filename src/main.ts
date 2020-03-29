import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '../config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle('GazEta')
        .setDescription('Gazprom nedra corporate newspaper')
        .setVersion('1.0')
        .addTag('release')
        // .addTag('article')
        // .addTag('article-content')
        // .addTag('tag')
        // .addTag('image')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    //await app.listen(appConfig.node.port);
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
