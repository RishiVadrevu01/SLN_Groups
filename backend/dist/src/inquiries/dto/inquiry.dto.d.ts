import { InquiryStatus } from '../../common/enums';
export declare class CreateInquiryDto {
    fullName: string;
    email: string;
    phone: string;
    subject?: string;
    message: string;
    projectInterest?: string;
    budgetRange?: string;
    preferredContactMethod?: string;
    projectId?: string;
}
export declare class UpdateInquiryStatusDto {
    status: InquiryStatus;
    adminNotes?: string;
}
