import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
    @ApiProperty({ example: 5 })
    rate: number;
}
