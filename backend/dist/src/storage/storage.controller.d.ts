import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<{
        url: string;
        key: string;
    }>;
}
