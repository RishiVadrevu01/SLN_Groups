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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(StorageService_1.name);
        this.s3Client = null;
        const accountId = this.configService.get('R2_ACCOUNT_ID');
        const accessKeyId = this.configService.get('R2_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('R2_SECRET_ACCESS_KEY');
        this.bucketName = this.configService.get('R2_BUCKET_NAME') || 'sln-assets';
        this.publicUrlBase = this.configService.get('R2_PUBLIC_URL') || '';
        this.uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
        if (accountId && accessKeyId && secretAccessKey) {
            this.s3Client = new client_s3_1.S3Client({
                region: 'auto',
                endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });
            this.logger.log('Configured Cloudflare R2 Storage Client');
        }
        else {
            this.logger.log('Using Local Disk Storage (Set R2 credentials to use Cloudflare R2)');
        }
    }
    async uploadFile(file, folder = 'general') {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const key = `${folder}/${uniqueSuffix}-${sanitizedFilename}`;
        if (this.s3Client) {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            await this.s3Client.send(command);
            const url = this.publicUrlBase ? `${this.publicUrlBase}/${key}` : `https://${this.bucketName}.r2.cloudflarestorage.com/${key}`;
            return { url, key };
        }
        else {
            const targetFolder = path.join(this.uploadDir, folder);
            if (!fs.existsSync(targetFolder)) {
                fs.mkdirSync(targetFolder, { recursive: true });
            }
            const localFilePath = path.join(targetFolder, `${uniqueSuffix}-${sanitizedFilename}`);
            fs.writeFileSync(localFilePath, file.buffer);
            const hostUrl = this.configService.get('APP_URL') || 'http://localhost:5000';
            const url = `${hostUrl}/uploads/${folder}/${uniqueSuffix}-${sanitizedFilename}`;
            return { url, key };
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map