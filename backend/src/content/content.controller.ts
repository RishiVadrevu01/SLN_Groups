import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Site Content & CMS')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all dynamic CMS content sections' })
  getAll() {
    return this.contentService.getAllContent();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get content for a specific section' })
  getSection(@Param('key') key: string) {
    return this.contentService.getSection(key);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update dynamic section content' })
  updateSection(
    @Param('key') key: string,
    @Body() payload: { content: any; title?: string },
  ) {
    return this.contentService.setSection(key, payload.content, payload.title);
  }
}

