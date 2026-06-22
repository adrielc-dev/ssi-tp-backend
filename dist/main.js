"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:4173',
            'https://ssi-tp-frontend.onrender.com',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.listen(port);
    console.log('🚀 Backend corriendo en http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map