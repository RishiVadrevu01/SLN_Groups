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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentService = class ContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    parseJson(val) {
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            }
            catch {
                return val;
            }
        }
        return val;
    }
    async getAllContent() {
        const list = await this.prisma.siteContent.findMany();
        const map = {};
        for (const item of list) {
            map[item.sectionKey] = this.parseJson(item.content);
        }
        return map;
    }
    async getSection(sectionKey) {
        const item = await this.prisma.siteContent.findUnique({
            where: { sectionKey },
        });
        return item ? this.parseJson(item.content) : null;
    }
    async setSection(sectionKey, content, title) {
        const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
        const result = await this.prisma.siteContent.upsert({
            where: { sectionKey },
            create: {
                sectionKey,
                title,
                content: contentStr,
            },
            update: {
                title,
                content: contentStr,
            },
        });
        return {
            ...result,
            content: this.parseJson(result.content),
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map