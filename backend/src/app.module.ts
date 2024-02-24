import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
    imports: [UsersModule, PrismaModule, PostsModule, ImagesModule, ReviewsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
