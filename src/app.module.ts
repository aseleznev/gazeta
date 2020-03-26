import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {appConfig} from '../config';
import {ReleaseEntity} from "./database/release/release.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...appConfig.database,
            entities: [ReleaseEntity]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
