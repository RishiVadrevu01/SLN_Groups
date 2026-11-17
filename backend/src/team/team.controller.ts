import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateMemberDto, UpdateMemberDto } from './dto/team.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Team & Leadership')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active leadership and team members' })
  findAll() {
    return this.teamService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Get all team members' })
  findAllAdmin() {
    return this.teamService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Create a new leadership/team profile' })
  create(@Body() dto: CreateMemberDto) {
    return this.teamService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Update team member' })
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: Delete team member' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}

