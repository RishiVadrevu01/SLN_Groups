import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3Client: S3Client | null = null;
  private bucketName: string;
  private publicUrlBase: string;
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY');
    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME') || 'sln-assets';
    this.publicUrlBase = this.configService.get<string>('R2_PUBLIC_URL') || '';

    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    if (accountId && accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('Configured Cloudflare R2 Storage Client');
    } else {
      this.logger.log('Using Local Disk Storage (Set R2 credentials to use Cloudflare R2)');
    }
  }

  async uploadFile(file: Express.Multer.File, folder = 'general'): Promise<{ url: string; key: string }> {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folder}/${uniqueSuffix}-${sanitizedFilename}`;

    if (this.s3Client) {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      const url = this.publicUrlBase ? `${this.publicUrlBase}/${key}` : `https://${this.bucketName}.r2.cloudflarestorage.com/${key}`;
      return { url, key };
    } else {
      // Local storage fallback
      const targetFolder = path.join(this.uploadDir, folder);
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
      }
      const localFilePath = path.join(targetFolder, `${uniqueSuffix}-${sanitizedFilename}`);
      fs.writeFileSync(localFilePath, file.buffer);
      const hostUrl = this.configService.get<string>('APP_URL') || 'http://localhost:5000';
      const url = `${hostUrl}/uploads/${folder}/${uniqueSuffix}-${sanitizedFilename}`;
      return { url, key };
    }
  }
}

