import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectCategory } from '../common/enums';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  private serializeProject(dto: any) {
    const data: any = { ...dto };
    if (Array.isArray(data.galleryImages)) data.galleryImages = JSON.stringify(data.galleryImages);
    if (Array.isArray(data.amenities)) data.amenities = JSON.stringify(data.amenities);
    if (Array.isArray(data.highlights)) data.highlights = JSON.stringify(data.highlights);
    if (data.specifications && typeof data.specifications === 'object') data.specifications = JSON.stringify(data.specifications);
    if (data.floorPlans && typeof data.floorPlans === 'object') data.floorPlans = JSON.stringify(data.floorPlans);
    return data;
  }

  private parseProject(project: any) {
    if (!project) return project;
    const parseJson = (val: any) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    };
    return {
      ...project,
      galleryImages: parseJson(project.galleryImages) || [],
      amenities: parseJson(project.amenities) || [],
      highlights: parseJson(project.highlights) || [],
      specifications: parseJson(project.specifications),
      floorPlans: parseJson(project.floorPlans),
    };
  }

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
        { title: { contains: query.search } },
        { location: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }
    const projects = await this.prisma.project.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    return projects.map((p) => this.parseProject(p));
  }

  async findAllAdmin() {
    const projects = await this.prisma.project.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    return projects.map((p) => this.parseProject(p));
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
    });
    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }
    return this.parseProject(project);
  }

  async findById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project not found`);
    }
    return this.parseProject(project);
  }

  async create(dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException(`Project with slug '${dto.slug}' already exists`);
    }
    const project = await this.prisma.project.create({
      data: this.serializeProject(dto),
    });
    return this.parseProject(project);
  }

  async update(id: string, dto: Partial<UpdateProjectDto>) {
    await this.findById(id);
    const project = await this.prisma.project.update({
      where: { id },
      data: this.serializeProject(dto),
    });
    return this.parseProject(project);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
