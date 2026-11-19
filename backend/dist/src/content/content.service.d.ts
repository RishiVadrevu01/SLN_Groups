import { PrismaService } from '../prisma/prisma.service';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    private parseJson;
    getAllContent(): Promise<Record<string, any>>;
    getSection(sectionKey: string): Promise<any>;
    setSection(sectionKey: string, content: any, title?: string): Promise<{
        content: any;
        id: string;
        updatedAt: Date;
        title: string | null;
        sectionKey: string;
    }>;
}
