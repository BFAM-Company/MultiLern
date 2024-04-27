import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const config = new DocumentBuilder()
        .setTitle('Multilern')
        .setDescription('The ultimate Multilern API description')
        .setVersion('0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
