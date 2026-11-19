export declare class CreateBranchDto {
    name: string;
    branchType: string;
    address: string;
    city: string;
    state: string;
    pincode?: string;
    phone: string;
    email: string;
    workingHours?: string;
    mapEmbedUrl: string;
    directionsUrl?: string;
    photoUrl: string;
    isHeadquarters?: boolean;
    orderIndex?: number;
}
export declare class UpdateBranchDto extends CreateBranchDto {
}
