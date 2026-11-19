"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path = require("path");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.setGlobalPrefix('api');
    app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 5000;
    await app.listen(port);
    logger.log(`🚀 SLN Groups Backend API running on: http://localhost:${port}/api`);
    logger.log(`📖 Swagger API Documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map