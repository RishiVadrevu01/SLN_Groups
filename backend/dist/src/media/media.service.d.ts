import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaItemDto, UpdateMediaItemDto } from './dto/media.dto';
import { MediaCategory } from '../common/enums';
export declare class MediaService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: MediaCategory): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        isFeatured: boolean;
        orderIndex: number;
        mediaType: string;
        url: string;
        thumbnailUrl: string | null;
        caption: string | null;
        eventDate: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        isFeatured: boolean;
        orderIndex: number;
        mediaType: string;
        url: string;
        thumbnailUrl: string | null;
        caption: string | null;
        eventDate: string | null;
    }>;
    create(dto: CreateMediaItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        isFeatured: boolean;
        orderIndex: number;
        mediaType: string;
        url: string;
        thumbnailUrl: string | null;
        caption: string | null;
        eventDate: string | null;
    }>;
    update(id: string, dto: Partial<UpdateMediaItemDto>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        isFeatured: boolean;
        orderIndex: number;
        mediaType: string;
        url: string;
        thumbnailUrl: string | null;
        caption: string | null;
        eventDate: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        category: string;
        isFeatured: boolean;
        orderIndex: number;
        mediaType: string;
        url: string;
        thumbnailUrl: string | null;
        caption: string | null;
        eventDate: string | null;
    }>;
}
