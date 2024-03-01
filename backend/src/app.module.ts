import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FichesModule } from './fiches/fiches.module';

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        PostsModule,
        ImagesModule,
        ReviewsModule,
        FichesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
