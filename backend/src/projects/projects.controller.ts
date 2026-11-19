import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectCategory } from '../common/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published projects (with optional filters)' })
  @ApiQuery({ name: 'category', enum: ProjectCategory, required: false })
  @ApiQuery({ name: 'isFeatured', type: Boolean, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  findAll(
    @Query('category') category?: ProjectCategory,
    @Query('isFeatured') isFeatured?: string,
    @Query('search') search?: string,
  ) {
    return this.projectsService.findAll({
      category,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' : undefined,
      search,
    });
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Get all projects (including drafts)' })
  findAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get project details by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Create a new project' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update project details' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete project' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

