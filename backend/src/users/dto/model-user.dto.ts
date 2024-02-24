import { ApiProperty } from '@nestjs/swagger';

export class UserModelDto {
    @ApiProperty({ example: 'Kubus' })
    nickname: string;

    @ApiProperty({ example: 'kochamMateuszaAleNikomuNieMowcie' })
    password: string;

    @ApiProperty({ example: 'Jakub' })
    name: string;

    @ApiProperty({ example: 'Szrama' })
    surname: string;

    @ApiProperty({ example: 'hotkubusiek@example.com' })
    email: string;
}
