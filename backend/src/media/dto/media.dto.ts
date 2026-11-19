import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaCategory } from '../../common/enums';

export class CreateMediaItemDto {
  @ApiProperty({ example: 'Groundbreaking Ceremony of SLN Heights' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: MediaCategory, example: MediaCategory.CONSTRUCTION_PROGRESS })
  @IsEnum(MediaCategory)
  category: MediaCategory;

  @ApiPropertyOptional({ example: 'IMAGE' })
  @IsOptional()
  @IsString()
  mediaType?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f' })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ example: 'The executive team marking the commencement of Phase II construction.' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ example: '2024-10-15' })
  @IsOptional()
  @IsString()
  eventDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;
}

export class UpdateMediaItemDto extends CreateMediaItemDto {}

