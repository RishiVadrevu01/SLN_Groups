import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto, UpdateInquiryStatusDto } from './dto/inquiry.dto';
import { InquiryStatus } from '../common/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inquiries & Leads')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new customer contact inquiry / project interest' })
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiriesService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Get all inquiries with optional status filter' })
  @ApiQuery({ name: 'status', enum: InquiryStatus, required: false })
  findAll(@Query('status') status?: InquiryStatus) {
    return this.inquiriesService.findAll(status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Get inquiry details by ID' })
  findById(@Param('id') id: string) {
    return this.inquiriesService.findById(id);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update inquiry status and internal notes' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateInquiryStatusDto) {
    return this.inquiriesService.updateStatus(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete an inquiry' })
  remove(@Param('id') id: string) {
    return this.inquiriesService.remove(id);
  }
}

