export declare class CreateMemberDto {
    name: string;
    designation: string;
    department?: string;
    bio: string;
    photoUrl: string;
    linkedinUrl?: string;
    email?: string;
    orderIndex?: number;
    isActive?: boolean;
}
export declare class UpdateMemberDto extends CreateMemberDto {
}
