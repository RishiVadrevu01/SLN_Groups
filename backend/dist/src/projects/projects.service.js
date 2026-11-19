"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    serializeProject(dto) {
        const data = { ...dto };
        if (Array.isArray(data.galleryImages))
            data.galleryImages = JSON.stringify(data.galleryImages);
        if (Array.isArray(data.amenities))
            data.amenities = JSON.stringify(data.amenities);
        if (Array.isArray(data.highlights))
            data.highlights = JSON.stringify(data.highlights);
        if (data.specifications && typeof data.specifications === 'object')
            data.specifications = JSON.stringify(data.specifications);
        if (data.floorPlans && typeof data.floorPlans === 'object')
            data.floorPlans = JSON.stringify(data.floorPlans);
        return data;
    }
    parseProject(project) {
        if (!project)
            return project;
        const parseJson = (val) => {
            if (typeof val === 'string') {
                try {
                    return JSON.parse(val);
                }
                catch {
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
    async findAll(query) {
        const where = { isPublished: true };
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
    async findBySlug(slug) {
        const project = await this.prisma.project.findUnique({
            where: { slug },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with slug ${slug} not found`);
        }
        return this.parseProject(project);
    }
    async findById(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project not found`);
        }
        return this.parseProject(project);
    }
    async create(dto) {
        const existing = await this.prisma.project.findUnique({
            where: { slug: dto.slug },
        });
        if (existing) {
            throw new common_1.ConflictException(`Project with slug '${dto.slug}' already exists`);
        }
        const project = await this.prisma.project.create({
            data: this.serializeProject(dto),
        });
        return this.parseProject(project);
    }
    async update(id, dto) {
        await this.findById(id);
        const project = await this.prisma.project.update({
            where: { id },
            data: this.serializeProject(dto),
        });
        return this.parseProject(project);
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.project.delete({
            where: { id },
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map