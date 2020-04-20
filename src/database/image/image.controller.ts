import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname, join } from "path";
import { diskStorage } from "multer";
const destination = join(__dirname, '..', '..', '..', 'storage');

const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};

@ApiTags('image')
@Controller('image')
export class ImageController {
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination,
                filename: editFileName
            })
        })
    )
    @ApiOperation({ summary: 'Create image from blob' })
    async saveImage(@UploadedFile() file) {
        console.log(file);
        return { ok: 'ok' };
    }

    // @Post('images')
    // @UseInterceptors(
    //     FileInterceptor('file', {
    //         storage: diskStorage({
    //             destination,
    //             filename: editFileName
    //         })
    //     })
    // )
    // @ApiOperation({ summary: 'Create image from blob' })
    // async uploadMultipleFiles(@UploadedFiles() files) {
    //     console.log(files);
    //     return { ok: 'ok' };
    // }
}
