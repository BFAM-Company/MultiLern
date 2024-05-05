import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: 5 })
    rate: number;
    @ApiProperty({ example: 1 })
    postId: number;
}
