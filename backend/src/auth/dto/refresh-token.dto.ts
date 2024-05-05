import { ApiProperty } from '@nestjs/swagger';

class RefreshTokenDto {
    @ApiProperty({ example: '28e38uqoiwhirq3.rewqhi318iou2qhrdasq3wo8;231' })
    refreshToken: string;
}

export default RefreshTokenDto;
