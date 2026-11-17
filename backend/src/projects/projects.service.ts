import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectCategory } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { category?: ProjectCategory; isFeatured?: boolean; search?: string }) {
    const where: any = { isPublished: true };
    if (query?.category) {
      where.category = query.category;
    }
    if (query?.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }
    if (query?.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.project.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findAllAdmin() {
    return this.prisma.project.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
    });
    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }
    return project;
  }

  async findById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project not found`);
    }
    return project;
  }

  async create(dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException(`Project with slug '${dto.slug}' already exists`);
    }
    return this.prisma.project.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<UpdateProjectDto>) {
    await this.findById(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}

