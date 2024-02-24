import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
    constructor(private readonly prisma: PrismaService) {}

    create(createReviewDto: CreateReviewDto) {
        return this.prisma.reviews.create({
            data: {
                rate: createReviewDto.rate,
                posts_reviews: {
                    connect: {
                        id: createReviewDto.postId,
                    },
                },
            },
        });
    }

    update(id: number, updateReviewDto: UpdateReviewDto) {
        return this.prisma.reviews.update({
            where: { id: id },
            data: {
                rate: updateReviewDto.rate,
            },
        });
    }

    remove(id: number) {
        return this.prisma.reviews.delete({ where: { id: id } });
    }
}
