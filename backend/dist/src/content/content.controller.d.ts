import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getAll(): Promise<Record<string, any>>;
    getSection(key: string): Promise<any>;
    updateSection(key: string, payload: {
        content: any;
        title?: string;
    }): Promise<{
        content: any;
        id: string;
        updatedAt: Date;
        title: string | null;
        sectionKey: string;
    }>;
}
