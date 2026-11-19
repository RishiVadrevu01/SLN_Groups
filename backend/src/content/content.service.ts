import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  private parseJson(val: any) {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return val;
  }

  async getAllContent() {
    const list = await this.prisma.siteContent.findMany();
    const map: Record<string, any> = {};
    for (const item of list) {
      map[item.sectionKey] = this.parseJson(item.content);
    }
    return map;
  }

  async getSection(sectionKey: string) {
    const item = await this.prisma.siteContent.findUnique({
      where: { sectionKey },
    });
    return item ? this.parseJson(item.content) : null;
  }

  async setSection(sectionKey: string, content: any, title?: string) {
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const result = await this.prisma.siteContent.upsert({
      where: { sectionKey },
      create: {
        sectionKey,
        title,
        content: contentStr,
      },
      update: {
        title,
        content: contentStr,
      },
    });
    return {
      ...result,
      content: this.parseJson(result.content),
    };
  }
}
