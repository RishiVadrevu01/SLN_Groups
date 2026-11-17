import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async getAllContent() {
    const list = await this.prisma.siteContent.findMany();
    const map: Record<string, any> = {};
    for (const item of list) {
      map[item.sectionKey] = item.content;
    }
    return map;
  }

  async getSection(sectionKey: string) {
    const item = await this.prisma.siteContent.findUnique({
      where: { sectionKey },
    });
    return item ? item.content : null;
  }

  async setSection(sectionKey: string, content: any, title?: string) {
    return this.prisma.siteContent.upsert({
      where: { sectionKey },
      create: {
        sectionKey,
        title,
        content,
      },
      update: {
        title,
        content,
      },
    });
  }
}

