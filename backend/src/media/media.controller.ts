import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMediaItemDto, UpdateMediaItemDto } from './dto/media.dto';
import { MediaCategory } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('SLN Album & Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get media album items with optional category filter' })
  @ApiQuery({ name: 'category', enum: MediaCategory, required: false })
  findAll(@Query('category') category?: MediaCategory) {
    return this.mediaService.findAll(category);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Add new media item / photo to album' })
  create(@Body() dto: CreateMediaItemDto) {
    return this.mediaService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update media item' })
  update(@Param('id') id: string, @Body() dto: UpdateMediaItemDto) {
    return this.mediaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete media item' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}

