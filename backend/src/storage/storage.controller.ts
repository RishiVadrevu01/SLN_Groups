import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload an image or document (Stored to Cloudflare R2 or local storage)' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'folder', required: false, description: 'Target folder (projects, team, album, etc.)' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = 'general',
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return this.storageService.uploadFile(file, folder);
  }
}

