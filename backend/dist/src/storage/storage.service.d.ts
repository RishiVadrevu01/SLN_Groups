import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    private readonly logger;
    private s3Client;
    private bucketName;
    private publicUrlBase;
    private uploadDir;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<{
        url: string;
        key: string;
    }>;
}
