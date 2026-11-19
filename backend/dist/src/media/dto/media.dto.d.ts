import { MediaCategory } from '../../common/enums';
export declare class CreateMediaItemDto {
    title: string;
    category: MediaCategory;
    mediaType?: string;
    url: string;
    thumbnailUrl?: string;
    caption?: string;
    eventDate?: string;
    isFeatured?: boolean;
    orderIndex?: number;
}
export declare class UpdateMediaItemDto extends CreateMediaItemDto {
}
