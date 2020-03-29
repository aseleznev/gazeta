import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    // const am = new AppModule();
    // am.log();

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
