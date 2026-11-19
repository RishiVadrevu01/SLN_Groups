import { ProjectCategory, PropertyType } from '../../common/enums';
export declare class CreateProjectDto {
    title: string;
    slug: string;
    tagline: string;
    description: string;
    category: ProjectCategory;
    propertyType: PropertyType;
    location: string;
    address: string;
    city: string;
    state: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    totalAreaSqFt: string;
    unitsCount?: string;
    floors?: string;
    completionYear?: string;
    expectedPossession?: string;
    featuredImage: string;
    galleryImages?: string[];
    amenities?: string[];
    highlights?: string[];
    specifications?: any;
    floorPlans?: any;
    brochureUrl?: string;
    virtualTourUrl?: string;
    videoUrl?: string;
    isFeatured?: boolean;
    isPublished?: boolean;
    orderIndex?: number;
}
export declare class UpdateProjectDto extends CreateProjectDto {
}
