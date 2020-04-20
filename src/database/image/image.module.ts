import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { ImageController } from './image.controller';
// import * as path from 'path';
// import * as multer from 'multer';
// const appDir = path.dirname(require.main.filename);
// const uploadHandler = multer({ dest: appDir + '/storage/' });
// const middleware = uploadHandler.single('upl');

@Module({
    providers: [ImageService],
    imports: [TypeOrmModule.forFeature([ImageEntity])],
    exports: [ImageService],
    controllers: [ImageController]
})
export class ImageModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //       .apply(middleware)
    //       .forRoutes('/blob');
    // }
}
