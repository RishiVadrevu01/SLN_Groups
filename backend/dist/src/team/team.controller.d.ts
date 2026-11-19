import { TeamService } from './team.service';
import { CreateMemberDto, UpdateMemberDto } from './dto/team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAll(): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        designation: string;
        department: string;
        bio: string;
        photoUrl: string;
        linkedinUrl: string | null;
        isActive: boolean;
    }[]>;
    findAllAdmin(): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        designation: string;
        department: string;
        bio: string;
        photoUrl: string;
        linkedinUrl: string | null;
        isActive: boolean;
    }[]>;
    create(dto: CreateMemberDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        designation: string;
        department: string;
        bio: string;
        photoUrl: string;
        linkedinUrl: string | null;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateMemberDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        designation: string;
        department: string;
        bio: string;
        photoUrl: string;
        linkedinUrl: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        orderIndex: number;
        designation: string;
        department: string;
        bio: string;
        photoUrl: string;
        linkedinUrl: string | null;
        isActive: boolean;
    }>;
}
