import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectCategory, PropertyType } from '../../common/enums';

export class CreateProjectDto {
  @ApiProperty({ example: 'SLN Grandeur' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'sln-grandeur' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Ultra-Luxury 3 & 4 BHK Sky Residences' })
  @IsString()
  @IsNotEmpty()
  tagline: string;

  @ApiProperty({ example: 'An architectural marvel presenting palatial residences...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ProjectCategory, example: ProjectCategory.ONGOING })
  @IsEnum(ProjectCategory)
  category: ProjectCategory;

  @ApiProperty({ enum: PropertyType, example: PropertyType.RESIDENTIAL_LUXURY })
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiProperty({ example: 'Financial District, Gachibowli' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Road No. 12, Financial District, Hyderabad' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Hyderabad' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Telangana' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ example: '500032' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: 17.4125 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 78.3498 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: '1,250,000' })
  @IsString()
  @IsNotEmpty()
  totalAreaSqFt: string;

  @ApiPropertyOptional({ example: '320 Residences' })
  @IsOptional()
  @IsString()
  unitsCount?: string;

  @ApiPropertyOptional({ example: 'G+36 Floors' })
  @IsOptional()
  @IsString()
  floors?: string;

  @ApiPropertyOptional({ example: '2024' })
  @IsOptional()
  @IsString()
  completionYear?: string;

  @ApiPropertyOptional({ example: 'December 2026' })
  @IsOptional()
  @IsString()
  expectedPossession?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' })
  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  galleryImages?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  amenities?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  highlights?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  specifications?: any;

  @ApiPropertyOptional()
  @IsOptional()
  floorPlans?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brochureUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  virtualTourUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;
}

export class UpdateProjectDto extends CreateProjectDto {}

