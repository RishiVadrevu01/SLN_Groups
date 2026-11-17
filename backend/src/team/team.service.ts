import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto, UpdateMemberDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.leadershipMember.findMany({
      where: { isActive: true },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findAllAdmin() {
    return this.prisma.leadershipMember.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findById(id: string) {
    const member = await this.prisma.leadershipMember.findUnique({
      where: { id },
    });
    if (!member) {
      throw new NotFoundException('Team member not found');
    }
    return member;
  }

  async create(dto: CreateMemberDto) {
    return this.prisma.leadershipMember.create({
      data: dto,
    });
  }

  async update(id: string, dto: Partial<UpdateMemberDto>) {
    await this.findById(id);
    return this.prisma.leadershipMember.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.leadershipMember.delete({
      where: { id },
    });
  }
}

