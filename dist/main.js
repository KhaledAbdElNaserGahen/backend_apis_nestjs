"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const server = express();
let cachedApp;
async function bootstrap() {
    if (!cachedApp) {
        const expressApp = new platform_express_1.ExpressAdapter(server);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, expressApp);
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        app.setGlobalPrefix('api/v1');
        await app.init();
        cachedApp = app;
    }
    return cachedApp;
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap().then(() => {
        const port = process.env.PORT || 3000;
        server.listen(port, () => {
            console.log(`🚀 Silent Connect API is running on: http://localhost:${port}/api/v1`);
        });
    });
}
exports.default = async (req, res) => {
    await bootstrap();
    return server(req, res);
};
//# sourceMappingURL=main.js.map