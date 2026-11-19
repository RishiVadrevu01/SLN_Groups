import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto, UpdateInquiryStatusDto } from './dto/inquiry.dto';
import { InquiryStatus } from '../common/enums';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    return this.prisma.inquiry.create({
      data: dto,
    });
  }

  async findAll(status?: InquiryStatus) {
    const where: any = {};
    if (status) {
      where.status = status;
    }
    return this.prisma.inquiry.findMany({
      where,
      include: {
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: {
        project: true,
      },
    });
    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }
    return inquiry;
  }

  async updateStatus(id: string, dto: UpdateInquiryStatusDto) {
    await this.findById(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: {
        status: dto.status,
        adminNotes: dto.adminNotes,
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.inquiry.delete({
      where: { id },
    });
  }
}

