import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({ example: 'S. L. Narayana' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Founder & Chairman' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiPropertyOptional({ example: 'LEADERSHIP' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 'With over three decades of visionary real estate leadership...' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/slnarayana' })
  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @ApiPropertyOptional({ example: 'chairman@slngroups.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateMemberDto extends CreateMemberDto {}

