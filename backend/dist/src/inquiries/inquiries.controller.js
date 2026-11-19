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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inquiries_service_1 = require("./inquiries.service");
const inquiry_dto_1 = require("./dto/inquiry.dto");
const enums_1 = require("../common/enums");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let InquiriesController = class InquiriesController {
    constructor(inquiriesService) {
        this.inquiriesService = inquiriesService;
    }
    create(dto) {
        return this.inquiriesService.create(dto);
    }
    findAll(status) {
        return this.inquiriesService.findAll(status);
    }
    findById(id) {
        return this.inquiriesService.findById(id);
    }
    updateStatus(id, dto) {
        return this.inquiriesService.updateStatus(id, dto);
    }
    remove(id) {
        return this.inquiriesService.remove(id);
    }
};
exports.InquiriesController = InquiriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new customer contact inquiry / project interest' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inquiry_dto_1.CreateInquiryDto]),
    __metadata("design:returntype", void 0)
], InquiriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin: Get all inquiries with optional status filter' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: enums_1.InquiryStatus, required: false }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InquiriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin: Get inquiry details by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InquiriesController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin: Update inquiry status and internal notes' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inquiry_dto_1.UpdateInquiryStatusDto]),
    __metadata("design:returntype", void 0)
], InquiriesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin: Delete an inquiry' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InquiriesController.prototype, "remove", null);
exports.InquiriesController = InquiriesController = __decorate([
    (0, swagger_1.ApiTags)('Inquiries & Leads'),
    (0, common_1.Controller)('inquiries'),
    __metadata("design:paramtypes", [inquiries_service_1.InquiriesService])
], InquiriesController);
//# sourceMappingURL=inquiries.controller.js.map