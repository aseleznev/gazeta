import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('storage/:imgId')
    test(@Param('imgId') imgId, @Res() res) {
        const imgPath = join(__dirname, '..', 'storage', imgId);
        return res.sendFile(imgPath);
    }
}
