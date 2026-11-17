import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaItemDto, UpdateMediaItemDto } from './dto/media.dto';
import { MediaCategory } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: MediaCategory) {
    const where: any = {};
    if (category && category !== MediaCategory.ALL) {
      where.category = category;
    }
    return this.prisma.mediaItem.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: string) {
    const item = await this.prisma.mediaItem.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Media item not found');
    }
    return item;
  }

  async create(dto: CreateMediaItemDto) {
    return this.prisma.mediaItem.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<UpdateMediaItemDto>) {
    await this.findById(id);
    return this.prisma.mediaItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.mediaItem.delete({
      where: { id },
    });
  }
}

