import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { ApiKeyAuthGuard } from '../auth/guards/api-key-auth.guard';
const destination = join(__dirname, '..', '..', '..', '..', 'storage');

const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
};

@ApiTags('image')
@Controller('image')
export class ImageController {
    @ApiBearerAuth('apiKey')
    @UseGuards(ApiKeyAuthGuard)
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
        // console.log(file);
        return { success: true };
    }
}
