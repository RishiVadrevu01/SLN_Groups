import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TeamModule } from './team/team.module';
import { BranchesModule } from './branches/branches.module';
import { MediaModule } from './media/media.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { StorageModule } from './storage/storage.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    TeamModule,
    BranchesModule,
    MediaModule,
    InquiriesModule,
    StorageModule,
    ContentModule,
  ],
})
export class AppModule {}

