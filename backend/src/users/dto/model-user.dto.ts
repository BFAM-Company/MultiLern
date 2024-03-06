import { ApiProperty } from '@nestjs/swagger';

export class UserModelDto {
    @ApiProperty({ example: 'Kubus' })
    nickname: string;

    @ApiProperty({ example: 'kochamMateuszaAleNikomuNieMowcie' })
    password: string;

    @ApiProperty({ example: 'hotkubusiek@example.com' })
    email: string;

    @ApiProperty({ example: 'avatar in base64 or link' })
    avatar?: string;
}
