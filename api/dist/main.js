"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prescriptions_service_1 = require("./prescriptions/prescriptions.service");
async function bootstrap() {
    try {
        process.loadEnvFile();
    }
    catch {
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (process.env.FRONTEND_URL ?? 'http://localhost:3000').split(','),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets(prescriptions_service_1.UPLOADS_DIR, { prefix: '/uploads/' });
    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map