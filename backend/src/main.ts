import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Serve static uploads
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Swagger OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('SLN Groups Corporate API')
    .setDescription('Official Backend REST API for SLN Groups Real Estate Corporate Website')
    .setVersion('1.0')
    .addTag('Projects', 'Manage completed, ongoing, and upcoming real estate developments')
    .addTag('Team & Leadership', 'Manage founders, board of directors, and leadership profiles')
    .addTag('Branches & Offices', 'Manage headquarters, regional offices, and experience centers')
    .addTag('SLN Album & Media', 'Manage architectural media, event galleries, and milestones')
    .addTag('Inquiries & Leads', 'Manage customer consultation requests, visits, and leads')
    .addTag('Site Content & CMS', 'Manage vision, mission, pillars, and corporate story')
    .addTag('Storage', 'Cloudflare R2 and asset storage service')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`🚀 SLN Groups Backend API running on: http://localhost:${port}/api`);
  logger.log(`📖 Swagger API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();

