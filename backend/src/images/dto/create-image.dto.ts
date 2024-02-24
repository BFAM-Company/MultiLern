import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
    @ApiProperty({ example: 'img in Base64' })
    img: string;
}
