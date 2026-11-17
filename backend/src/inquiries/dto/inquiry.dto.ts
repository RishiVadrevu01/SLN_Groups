import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InquiryStatus } from '@prisma/client';

export class CreateInquiryDto {
  @ApiProperty({ example: 'Vikram Malhotra' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'vikram.malhotra@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+91 98765 43210' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'Site Visit & Brochure Request' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'I am interested in scheduling a private site walkthrough for SLN Grandeur 4 BHK.' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({ example: 'SLN Grandeur' })
  @IsOptional()
  @IsString()
  projectInterest?: string;

  @ApiPropertyOptional({ example: '₹2.5 Cr - ₹4.0 Cr' })
  @IsOptional()
  @IsString()
  budgetRange?: string;

  @ApiPropertyOptional({ example: 'PHONE' })
  @IsOptional()
  @IsString()
  preferredContactMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  projectId?: string;
}

export class UpdateInquiryStatusDto {
  @ApiProperty({ enum: InquiryStatus, example: InquiryStatus.CONTACTED })
  @IsEnum(InquiryStatus)
  status: InquiryStatus;

  @ApiPropertyOptional({ example: 'Spoke with client on Nov 18; scheduled site visit for Saturday 11 AM.' })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}

