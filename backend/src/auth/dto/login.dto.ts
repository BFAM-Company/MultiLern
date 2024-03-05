import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'hotkubusiek@example.com' })
    email?: string;

    @ApiProperty({ example: 'Kubus' })
    username?: string;

    @ApiProperty({ example: 'zartowalemWoleOliwkeHiHi' })
    password: string;
}
