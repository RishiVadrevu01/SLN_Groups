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
exports.UpdateInquiryStatusDto = exports.CreateInquiryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
class CreateInquiryDto {
}
exports.CreateInquiryDto = CreateInquiryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Vikram Malhotra' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vikram.malhotra@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+91 98765 43210' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Site Visit & Brochure Request' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'I am interested in scheduling a private site walkthrough for SLN Grandeur 4 BHK.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SLN Grandeur' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "projectInterest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '₹2.5 Cr - ₹4.0 Cr' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "budgetRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'PHONE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "preferredContactMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInquiryDto.prototype, "projectId", void 0);
class UpdateInquiryStatusDto {
}
exports.UpdateInquiryStatusDto = UpdateInquiryStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.InquiryStatus, example: enums_1.InquiryStatus.CONTACTED }),
    (0, class_validator_1.IsEnum)(enums_1.InquiryStatus),
    __metadata("design:type", String)
], UpdateInquiryStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Spoke with client on Nov 18; scheduled site visit for Saturday 11 AM.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateInquiryStatusDto.prototype, "adminNotes", void 0);
//# sourceMappingURL=inquiry.dto.js.map