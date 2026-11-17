import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'SLN Corporate Tower - Global HQ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'HEADQUARTERS' })
  @IsString()
  @IsNotEmpty()
  branchType: string;

  @ApiProperty({ example: 'Level 14, SLN Pinnacle, Financial District' })
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

  @ApiProperty({ example: '+91 (040) 6890 5500' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'info@slngroups.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: 'Mon - Sat: 9:00 AM - 7:00 PM' })
  @IsOptional()
  @IsString()
  workingHours?: string;

  @ApiProperty({ example: 'https://maps.google.com/...' })
  @IsString()
  @IsNotEmpty()
  mapEmbedUrl: string;

  @ApiPropertyOptional({ example: 'https://maps.app.goo.gl/...' })
  @IsOptional()
  @IsString()
  directionsUrl?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1497366216548-37526070297c' })
  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isHeadquarters?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;
}

export class UpdateBranchDto extends CreateBranchDto {}

